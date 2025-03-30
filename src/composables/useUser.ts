import {socket} from "~/composables/useSocket";
import defaultAvatar from '@/assets/images/avatars/00000.png'

// Symbol for dependency injection
const USER_STATE_SYMBOL = 'userState';

const emptyUser: User = {
	id: '',
	name: ' ',
	isRoomOwner: false,
	currentRoomCode: null,
	socketId: '',
	connected: false,
	avatar: 0,
}

const globalUserState = reactive<{ current: User }>({
	current: emptyUser,
});


export const useUser = () => {
	if (typeof window === 'undefined') {
		return {
			user: computed(() => emptyUser),
			getUserFromServer: async () => ({ success: false }),
			initializeUser: async () => ({ success: false }),
			updateUserName: () => {},
			updateUserAvatar: () => {},
			resetUser: () => {},
		};
	}

	// dependency injection
	provide(USER_STATE_SYMBOL, globalUserState);

	const getUserFromServer = async (): Promise<UserInfoResponse> => {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				socket.off('userInfo');
				reject(new Error('Get user info timeout'));
			}, 10000);

			socket.once('userInfo', (message) => {
				console.log('userInfo', message)
				const data = message as UserInfoResponse;
				clearTimeout(timeout);
				if (data) {
					// Update the global state
					Object.assign(globalUserState.current, data.user);
					console.log('saved user from server', globalUserState.current);
					resolve(data);
				} else {
					reject(new Error('No user data received'));
				}
			});

			socket.emit('getUser');
			console.log('emitted getUser')
		});
	};

	const initializeUser = async () => {
		if (!globalUserState.current.id || globalUserState.current.id === '') {
			return getUserFromServer();
		}
		console.log('saved user locally', globalUserState.current);
		return Promise.resolve({
			user: globalUserState.current,
		});
	};

	const updateUserName = (newName: string) => {
		globalUserState.current.name = newName;
		socket.emit('changeUserName', { name: newName } as ChangeUserNameRequest);
	};

	const updateUserAvatar = (newAvatar: number) => {
		globalUserState.current.avatar = newAvatar;
		socket.emit('changeUserAvatar', { avatar: newAvatar } as ChangeUserAvatarRequest);
	};

	const resetUser = () => {
		Object.assign(globalUserState.current, {
			id: '',
			name: ' ',
			isRoomOwner: false,
			currentRoomCode: null,
			socketId: '',
			connected: false,
			avatar: 0,
		});
	};
	
	const UserAvatarUrl = computed(() => {
		if (!globalUserState.current) return defaultAvatar
		const avatarNumber = globalUserState.current.avatar;
		const paddedNumber = avatarNumber.toString().padStart(5, '0');
		return `/assets/images/avatars/${paddedNumber}.png`;
	})

	return {
		user: computed(() => globalUserState.current),
		avatarUrl: computed(() => UserAvatarUrl.value),
		getUserFromServer,
		initializeUser,
		updateUserName,
		updateUserAvatar,
		resetUser,
	};
};

export const getMemberAvatarUrl = (avatar: number) => {
	const paddedNumber = avatar.toString().padStart(5, '0');
	return `/assets/images/avatars/${paddedNumber}.png`;
}
