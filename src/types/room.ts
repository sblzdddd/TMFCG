import type {ChatMessage} from "./chat";
import type {User} from "./user";

export interface Room {
	code: string;
	owner: string;
	isPrivate: boolean;
	memberIds: string[];
	members: User[];
	messages: ChatMessage[];
}

export type PublicRoomInfo = {
	code: string;
	owner: string;
	memberCount: number;
}
