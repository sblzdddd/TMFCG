import type { User } from "../User";

// Change User Name
export type ChangeUserNameRequest = {
	name: string;
}

// User Info
export type UserInfoResponse = {
	user: User;
}