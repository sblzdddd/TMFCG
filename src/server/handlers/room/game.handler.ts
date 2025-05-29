import { BaseHandler, type IBaseHandler } from "../base/base.handler";
import { RoomManager, UserManager } from "@/server/managers";
import type { IBaseCard } from "~/lib/Card/BaseCard";

// Request and Response types
interface DrawCardRequest {
  count: number;
}

interface CardDrawnPayload {
  receiver: number;
  count: number;
  cards?: string[];
  drawerId: string;
}

interface PlayCardRequest {
  cardId: string;
}

interface CardPlayedPayload {
  userId: string;
  cardId: string;
}

export class GameHandler extends BaseHandler implements IBaseHandler {
  initialize(): void {
    this.on("getRoomCardProfile", () => this.handleGetRoomCardProfile());
    this.on("drawCard", (data: DrawCardRequest) => this.handleDrawCard(data));
    this.on("getMyCards", () => this.handleGetMyCards());
    this.on("playCard", (data: PlayCardRequest) => this.handlePlayCard(data));
    this.on("getPlayingHistory", () => this.handleGetPlayingHistory());
    this.on("getDeckCount", () => this.handleGetDeckCount());
  }

  private handleGetRoomCardProfile(): void {
    const user = UserManager.getUser(this.socket);
    if (!user || !user.currentRoomCode) {
      this.emit("error", { message: "User or room not found" });
      return;
    }

    const room = RoomManager.getRoom(user.currentRoomCode);
    if (!room || !room.cardProfile) {
      this.emit("error", { message: "Room or card profile not found" });
      return;
    }

    this.emit("roomCardProfile", room.cardProfile);
  }

  private handleDrawCard(data: DrawCardRequest): void {
    console.log('handleDrawCard', data);
    const user = UserManager.getUser(this.socket);
    if (!user || !user.currentRoomCode) {
      this.emit("error", { message: "User or room not found" });
      return;
    }

    const room = RoomManager.getRoom(user.currentRoomCode);
    if (!room) {
      this.emit("error", { message: "Room not found" });
      return;
    }

    const { count } = data;
    if (count <= 0 || room.deck.length < count) {
      this.emit("error", { message: "Invalid card count or not enough cards in deck" });
      return;
    }

    const drawnCards: IBaseCard[] = [];
    for (let i = 0; i < count; i++) {
      const card = room.deck.pop();
      if (card) {
        drawnCards.push(card);
      }
    }

    if (!room.playerHands[user.id]) {
      room.playerHands[user.id] = [];
    }
    const drawnCardIds = drawnCards.map(c => c.id);
    room.playerHands[user.id].push(...drawnCardIds);
    
    // Send event to the drawer with card information
    const drawerPayload: CardDrawnPayload = {
      receiver: 0,
      count: drawnCards.length,
      cards: drawnCardIds,
      drawerId: user.id,
    };
    this.emit("cardDrawn", drawerPayload);

    // Send event to other players without card information
    const othersPayload: CardDrawnPayload = {
      receiver: 1,
      count: drawnCards.length,
      drawerId: user.id,
    };
    this.emitToRoom(room.code, "cardDrawn", othersPayload);
  }

  private handleGetDeckCount(): void {
    const user = UserManager.getUser(this.socket);
    if (!user || !user.currentRoomCode) {
      this.emit("error", { message: "User or room not found" });
      return;
    }

    const room = RoomManager.getRoom(user.currentRoomCode);
    if (!room) {
      this.emit("error", { message: "Room not found" });
      return;
    }

    this.emit("deckCount", room.deck.length);
  }

  private handleGetMyCards(): void {
    const user = UserManager.getUser(this.socket);
    if (!user || !user.currentRoomCode) {
      this.emit("error", { message: "User or room not found" });
      return;
    }

    const room = RoomManager.getRoom(user.currentRoomCode);
    if (!room) {
      this.emit("error", { message: "Room not found" });
      return;
    }

    const myCards = room.playerHands[user.id] || [];
    this.emit("myCards", myCards);
  }

  private handlePlayCard(data: PlayCardRequest): void {
    const user = UserManager.getUser(this.socket);
    if (!user || !user.currentRoomCode) {
      this.emit("error", { message: "User or room not found" });
      return;
    }

    const room = RoomManager.getRoom(user.currentRoomCode);
    if (!room) {
      this.emit("error", { message: "Room not found" });
      return;
    }

    const { cardId } = data;
    const playerHand = room.playerHands[user.id];
    if (!playerHand || !playerHand.includes(cardId)) {
      this.emit("error", { message: "Card not in hand or invalid card" });
      return;
    }

    // Remove card from hand
    room.playerHands[user.id] = playerHand.filter((id: string) => id !== cardId);

    // Add to play history
    room.playHistory.push({ userId: user.id, cards: [cardId] });

    // Notify all players in the room
    const payload: CardPlayedPayload = { userId: user.id, cardId };
    this.emitToAllInRoom(room.code, "cardPlayed", payload);
  }

  private handleGetPlayingHistory(): void {
    const user = UserManager.getUser(this.socket);
    if (!user || !user.currentRoomCode) {
      this.emit("error", { message: "User or room not found" });
      return;
    }

    const room = RoomManager.getRoom(user.currentRoomCode);
    if (!room) {
      this.emit("error", { message: "Room not found" });
      return;
    }

    this.emit("playingHistory", room.playHistory);
  }
}
