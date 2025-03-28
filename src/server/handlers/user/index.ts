import { BaseHandler } from '../base/base.handler';
import { UserManager } from '@/server/managers/UserManager';
import type { ChangeUserNameRequest, UserInfoResponse } from '@/types/DTO/user.dto';

export class UserHandler extends BaseHandler {
  public initialize() {
    this.on('getUser', () => this.handlerGetUser());
    this.on('changeUserName', (data: ChangeUserNameRequest) => this.handlerChangeUserName(data));
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
  }
}