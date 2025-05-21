import {socket} from "~/composables/useSocket";
import defaultAvatar from '@/assets/images/avatars/00000.png'
import type {User} from "~/types/user";
import type {ChangeUserAvatarRequest, ChangeUserNameRequest, UserInfoResponse} from "~/types/DTO/user.dto";
import {useLogger} from "@/composables/useLogger";

const {debug} = useLogger('user');

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
			getUserFromServer: async () => ({success: false}),
			initializeUser: async () => ({success: false}),
			updateUserName: () => {
			},
			updateUserAvatar: () => {
			},
			resetUser: () => {
			},
		};
	}

	const getUserFromServer = async (): Promise<UserInfoResponse> => {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				socket.off('userInfo');
				reject(new Error('Get user info timeout'));
			}, 10000);

			socket.once('userInfo', (message) => {
				debug(`userInfo: ${message}`)
				const data = message as UserInfoResponse;
				clearTimeout(timeout);
				if (data) {
					// Update the global state
					Object.assign(globalUserState.current, data.user);
					debug(`saved user from server: ${globalUserState.current.name}`)
					resolve(data);
				} else {
					reject(new Error('No user data received'));
				}
			});

			socket.emit('getUser');
			debug('emitted getUser')
		});
	};

	const initializeUser = async () => {
		if (!globalUserState.current.id || globalUserState.current.id === '') {
			return getUserFromServer();
		}
		debug(`saved user locally: ${globalUserState.current.name}`)
		return Promise.resolve({
			user: globalUserState.current,
		});
	};

	const updateUserName = (newName: string) => {
		globalUserState.current.name = newName;
		socket.emit('changeUserName', {name: newName} as ChangeUserNameRequest);
	};

	const updateUserAvatar = (newAvatar: number) => {
		globalUserState.current.avatar = newAvatar;
		socket.emit('changeUserAvatar', {avatar: newAvatar} as ChangeUserAvatarRequest);
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
