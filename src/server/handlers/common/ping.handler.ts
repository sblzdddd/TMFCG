import type { PingRequest, PingResponse } from "@/types/DTO";

import { BaseHandler } from "../base/base.handler";

export class PingHandler extends BaseHandler {
  public initialize(): void {
    this.socket.on("ping", this.handlePing);
  }

  private handlePing(data: PingRequest): void {
    this.emit("pong", { timestamp: data.timestamp } as PingResponse);
  }
}
