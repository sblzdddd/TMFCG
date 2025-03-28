import type { User } from '@/types/User';
import { socket } from '@/composables/useSocket';
import { provide, reactive, computed } from 'vue';
import type { ChangeUserNameRequest, UserInfoResponse } from '@/types/DTO/user.dto';

// Symbol for dependency injection
const USER_STATE_SYMBOL = 'userState';

const emptyUser: User = {
	id: '',
	name: ' ',
	isRoomOwner: false,
	currentRoomCode: null,
	socketId: '',
	connected: false,
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

	const resetUser = () => {
		Object.assign(globalUserState.current, {
			id: '',
			name: ' ',
			isRoomOwner: false,
			currentRoomCode: null,
			socketId: '',
			connected: false,
		});
	};

	return {
		user: computed(() => globalUserState.current),
		getUserFromServer,
		initializeUser,
		updateUserName,
		resetUser,
	};
};