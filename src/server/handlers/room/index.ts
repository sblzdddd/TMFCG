import { BaseHandler } from '../base/base.handler';
import { CreateRoomHandler } from './create.handler';
import { JoinRoomHandler } from './join.handler';
import { LeaveRoomHandler } from './leave.handler';
import { DisconnectRoomHandler } from './disconnect.handler';
import { GetCurrentRoomHandler } from './get_current.handler';
import { ListRoomsHandler } from './list.handler';
export class RoomHandler extends BaseHandler {
  public initialize() {
    new CreateRoomHandler(this.socket);
    new JoinRoomHandler(this.socket);
    new LeaveRoomHandler(this.socket);
    new DisconnectRoomHandler(this.socket);
    new GetCurrentRoomHandler(this.socket);
    new ListRoomsHandler(this.socket);
  }
}