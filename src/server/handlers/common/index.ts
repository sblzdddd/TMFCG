import { BaseHandler } from "../base/base.handler";

import { PingHandler } from "./ping.handler";

export class CommonHandler extends BaseHandler {
  public initialize(): void {
    new PingHandler(this.socket);
  }
}
