import type {User} from "./user";

export type ChatMessage = {
	sender: User
	message: string
	timestamp: number
}