import type {User} from "../user";

// Change User Name
export type ChangeUserNameRequest = {
	name: string;
}

// User Info
export type UserInfoResponse = {
	user: User;
}

// Change User Avatar
export type ChangeUserAvatarRequest = {
	avatar: number;
}
