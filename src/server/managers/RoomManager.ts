// eslint-disable no-unused-vars
import type { PublicRoomInfo, Room } from "~/types/room";
import type { RoomMember, User } from "~/types/user";
import type { ChatMessage } from "~/types/chat";
import { useLogger } from "~/composables/useLogger";
import type { ICardProfile } from "~/lib/CardProfile/CardProfile";
import setB from "@/assets/Set B.json";
import { PlayingCardFactory } from "~/lib/PlayingCard/PlayingCardFactory";
import type { IBaseCard } from "~/lib/Card/BaseCard";

const rooms = new Map<string, Room>();

const shuffleArray = (array: IBaseCard[]): IBaseCard[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

const { debug, warn } = useLogger("roomManager");

export const RoomManager = {

	addMessage(roomCode: string, message: ChatMessage) {
		const room = this.getRoom(roomCode);
		if (!room) {
			throw new Error('Room not found');
		}
		room.messages.push(message);
		return room.messages;
	},

	getRoom(code: string | undefined | null): Room | undefined {
		if (!code) {
			warn(`No code provided`);

			return undefined;
		}

		return rooms.get(code);
	},

	getPublicRooms(): PublicRoomInfo[] {
		debug(`Total rooms in Map: ${rooms.size}`);

		const publicRooms = Array.from(rooms.values()).filter((room) => !room.isPrivate);

		debug(`Found ${publicRooms.length} public rooms out of ${rooms.size} total rooms`);

		publicRooms.forEach(room => {
			debug(`Public room: ${room.code}, Owner: ${room.owner}, Members: ${room.members}`);
		});

		return publicRooms.map((room) => ({
			code: room.code,
			owner: room.members.find((m) => m.id === room.owner)?.name || "Unknown",
			memberCount: room.members.length,
		}));
	},

	createRoom(user: User, isPrivate: boolean): Room {
		const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

		const cardProfileData = setB as ICardProfile;
		const initialDeck = shuffleArray(cardProfileData.cards.map(cardData => PlayingCardFactory.createPlayingCard(cardData, 0).data));

		const newRoom: Room = {
			code: roomCode,
			owner: user.id,
			isPrivate: isPrivate,
			memberIds: [user.id],
			members: [user],
			messages: [],
			deck: initialDeck,
			cardProfile: cardProfileData,
			playerHands: {},
			playHistory: [],
		};

		rooms.set(roomCode, newRoom);

		return newRoom;
	},

	deleteRoom(code: string) {
		rooms.delete(code);
	},

	getMembersFromRoom(room: Room): RoomMember[] {
		return room.members.map((m) => ({
			id: m.id,
			name: m.name || "Guest",
			isRoomOwner: m.isRoomOwner,
			connected: m.connected,
			avatar: m.avatar,
		}));
	},

	updateUserInMessages(user: User) {
		rooms.forEach(room => {
			room.messages.forEach(message => {
				if (message.sender.id === user.id) {
					message.sender = user;
				}
			});
		});
	},
}
