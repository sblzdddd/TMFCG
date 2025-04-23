import {BaseHandler} from '../base/base.handler';
import {UserManager} from '@/server/managers/UserManager';
import {RoomManager} from '@/server/managers/RoomManager';
import type {ChangeUserAvatarRequest, ChangeUserNameRequest, UserInfoResponse} from '@/types/DTO/user.dto';
import type {RoomMembersUpdateResponse} from '@/types/DTO/room.dto';
import type {RoomChatHistoryResponse} from '@/types/DTO/chat.dto';
import type {User} from '@/types/user';


export class UserHandler extends BaseHandler {
	public initialize() {
		this.on('getUser', () => this.handlerGetUser());
		this.on('changeUserName', (data: ChangeUserNameRequest) => this.handlerChangeUserName(data));
		this.on('changeUserAvatar', (data: ChangeUserAvatarRequest) => this.handlerChangeUserAvatar(data));
	}

	public handlerGetUser() {
		const user = UserManager.getUser(this.socket);
		if (!user) {
			this.emit('userInfo', undefined);
		}
		this.emit('userInfo', {
			user: user,
		} as UserInfoResponse);
	}

	public handlerChangeUserName(data: ChangeUserNameRequest) {
		const user = UserManager.getUser(this.socket);
		if (!user) {
			return;
		}
		UserManager.changeUserName(user, data.name);
		RoomManager.updateUserInMessages(user);
		this.emitUserUpdate(user);
	}

	public handlerChangeUserAvatar(data: ChangeUserAvatarRequest) {
		const user = UserManager.getUser(this.socket);
		if (!user) {
			return;
		}
		UserManager.changeUserAvatar(user, data.avatar);
		RoomManager.updateUserInMessages(user);
		this.emitUserUpdate(user);
	}

	public emitUserUpdate(user: User) {
		if (user.currentRoomCode) {
			const room = RoomManager.getRoom(user.currentRoomCode);
			if (room) {
				this.emitToAllInRoom(room.code, 'room_member_update', {
					members: RoomManager.getMembersFromRoom(room)
				} as RoomMembersUpdateResponse);

				this.emitToAllInRoom(room.code, 'onRoomChat', {
					messages: room.messages
				} as RoomChatHistoryResponse);
			}
		}
	}
}