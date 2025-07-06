import { BaseHandler, type IBaseHandler } from "../base/base.handler";
import { RoomManager, UserManager } from "@/server/managers";
import type { IBaseCard } from "~/lib/Card/BaseCard";

// Request and Response types
interface DrawCardRequest {
  count: number;
}

interface CardDrawnPayload {
  count: number;
  cards?: string[];
  drawerId: string;
  source: string;
  sourceId?: string;
}

interface PlayCardRequest {
  cardIds: string[];
}

interface CardPlayedPayload {
  userId: string;
  cardIds: string[];
}

interface OpponentCardCountsPayload {
  [userId: string]: number;
}

interface LastPlayedCardsPayload {
  [userId: string]: string[];
}

interface RequestDrawFromPlayedCardRequest {
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
    this.on("getOpponentCardCounts", () => this.handleGetOpponentCardCounts());
    this.on("getLastPlayedCards", () => this.handleGetLastPlayedCards());
    this.on("requestDrawFromPlayedCard", (data: RequestDrawFromPlayedCardRequest) => this.handleRequestDrawFromPlayedCard(data));
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
      count: drawnCards.length,
      cards: drawnCardIds,
      drawerId: user.id,
      source: 'deck',
    };
    this.emit("cardDrawn", drawerPayload);

    // Send event to other players without card information
    const othersPayload: CardDrawnPayload = {
      count: drawnCards.length,
      drawerId: user.id,
      source: 'deck',
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

    const { cardIds } = data;
    const playerHand = room.playerHands[user.id];
    if (!playerHand || !cardIds.every(id => playerHand.includes(id))) {
      this.emit("error", { message: "Card not in hand or invalid card" });
      return;
    }

    // Remove card from hand
    room.playerHands[user.id] = playerHand.filter((id: string) => !cardIds.includes(id));

    // Update last played cards
    if (!room.lastPlayedCards) {
      room.lastPlayedCards = {};
    }
    room.lastPlayedCards[user.id] = cardIds;

    // Add to play history
    room.playHistory.push({ userId: user.id, cards: cardIds });

    // Notify all players in the room
    const payload: CardPlayedPayload = { userId: user.id, cardIds };
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

  private handleGetOpponentCardCounts(): void {
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

    const opponentCounts: OpponentCardCountsPayload = {};
    for (const memberId in room.playerHands) {
      if (memberId !== user.id) {
        opponentCounts[memberId] = room.playerHands[memberId]?.length || 0;
      }
    }
    this.emit("opponentCardCounts", opponentCounts);
  }

  private handleGetLastPlayedCards(): void {
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

    const lastPlayedCards: LastPlayedCardsPayload = room.lastPlayedCards || {};
    this.emit("lastPlayedCards", lastPlayedCards);
  }

  

  private handleRequestDrawFromPlayedCard(data: RequestDrawFromPlayedCardRequest): void {
    console.log('handleRequestDrawFromPlayedCard', data);
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
    
    const { userId, cardId } = data;
    const playedCard = room.lastPlayedCards[userId]?.find(id => id === cardId);
    if (!playedCard) {
      this.emit("error", { message: "Played card not found" });
      return;
    }

    // Remove card from played cards
    room.lastPlayedCards[userId] = room.lastPlayedCards[userId]?.filter(id => id !== cardId) || [];

    // Add to player hand
    room.playerHands[user.id].push(cardId);

    // Notify all players in the room
    const payload: CardDrawnPayload = {
      count: 1,
      cards: [cardId],
      drawerId: user.id,
      source: 'playedCard',
      sourceId: userId,
    };
    this.emitToAllInRoom(room.code, "cardDrawn", payload);
  }
}
