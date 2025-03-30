// Symbol for dependency injection
import {useSocket, waitForConnection, socket} from "@/composables/useSocket";

const ROOM_STATE_SYMBOL = 'roomState';

interface RoomState {
	current: Room | null;
	publicList: Room[];
}

const globalRoomState = reactive<RoomState>({
	current: null,
	publicList: [],
});

export const useRoom = () => {
	// Return dummy values when running on server
	if (typeof window === 'undefined') {
		return {
			currentRoom: computed(() => null),
			setCurrentRoom: () => {},
			leaveRoom: async () => ({ success: false } as LeaveRoomResponse),
			createRoom: async () => ({ success: false, room: null, roomCode: '', isOwner: false } as unknown as CreateRoomResponse),
			joinRoom: async () => ({ success: false } as JoinRoomResponse),
			getCurrentRoom: async () => ({ success: false, room: null } as unknown as RoomInfoResponse),
			listRooms: async () => ({ success: false, rooms: [] } as ListRoomsResponse),
		};
	}

	// dependency injection
	provide(ROOM_STATE_SYMBOL, globalRoomState);

	const setCurrentRoom = (room: Room | null) => {
		globalRoomState.current = room;
		console.log('setting current room', globalRoomState.current)
	};

	const createRoom = async ({isPrivate}: {isPrivate: boolean}): Promise<CreateRoomResponse> => {
		if (!useSocket().isConnected) {
			await waitForConnection()
		}
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				socket.off('room_created');
				reject(new Error('Create room timeout'));
			}, 10000);

			socket.once('room_created', (data) => {
				const response = data as CreateRoomResponse
				clearTimeout(timeout);
				if (response.room) {
					setCurrentRoom(response.room);
					resolve(response);
				}
				resolve(response);
			});
			socket.emit('createRoom', {isPrivate} as CreateRoomRequest);
		})
	}

	const joinRoom = async (roomCode: string): Promise<JoinRoomResponse> => {
		if (!useSocket().isConnected) {
			await waitForConnection()
		}
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				socket.off('room_joined');
				reject(new Error('Join room timeout'));
			}, 10000);

			socket.once('room_joined', (data) => {
				const response = data as JoinRoomResponse
				clearTimeout(timeout);
				if (response.success && response.room) {
					setCurrentRoom(response.room);
				}
				resolve(data);
			});

			socket.emit('joinRoom', {roomCode});
		});
	}
	const leaveRoom = async (): Promise<LeaveRoomResponse> => {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				socket.off('room_left');
				reject(new Error('Leave room timeout'));
			}, 10000);

			socket.once('room_left', (data) => {
				clearTimeout(timeout);
				if (data.success) {
					setCurrentRoom(null);
					resolve(data);
				} else {
					reject(new Error(data.message || 'Failed to leave room'));
				}
			});

			socket.emit('leaveRoom');
		});
	};

	const listRooms = async (): Promise<ListRoomsResponse> => {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				socket.off('publicRooms');
				reject(new Error('List public rooms timeout'));
			}, 10000);

			socket.once('publicRooms', (data) => {
				clearTimeout(timeout);
				resolve(data as ListRoomsResponse);
			});

			socket.emit('listRooms');
		});
	}

	const getCurrentRoom = async (): Promise<RoomInfoResponse> => {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				socket.off('current_room');
				reject(new Error('Get current room timeout'));
			}, 10000);

			socket.once('current_room', (data) => {
				const response = data as RoomInfoResponse
				clearTimeout(timeout);
				if (response.room) {
					setCurrentRoom(response.room);
				} else {
					console.log('no room found')
				}
				resolve(response);
			});

			socket.emit('get_current_room');
		});
	}

	return {
		currentRoom: computed(() => globalRoomState.current),
		publicList: computed(() => globalRoomState.publicList),
		setCurrentRoom,
		leaveRoom,
		createRoom,
		joinRoom,
		getCurrentRoom,
		listRooms,
	};
};
