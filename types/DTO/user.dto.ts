// Change User Name
declare global {
	type ChangeUserNameRequest = {
		name: string;
	}

	// User Info
	type UserInfoResponse = {
		user: User;
	}

	// Change User Avatar
	type ChangeUserAvatarRequest = {
		avatar: number;
	}
}
