import {useCardProfile} from "./useCardProfile";
import {useCardEditor} from "./useCardEditor";
import {useLogger} from "~/composables/useLogger";
import type {ICardProfile} from "~/lib/CardProfile/CardProfile";
import {ProfileLoader} from "~/lib/CardProfile";

export const useCardProfileLoader = () => {
	const {currentProfile, setCardProfile} = useCardProfile();
	const {editorStatus} = useCardEditor()
	const {debug} = useLogger('profile:loader');
	if (typeof window === 'undefined') {
		return {
			loadProfile: () => {
			},
			loadProfileFromFile: () => {
			},
		}
	}

	const loadProfile = (profile: ICardProfile) => {

		const newProfile = ProfileLoader.fromObject(profile)
		setCardProfile(newProfile)
		editorStatus.lastSavedState = JSON.stringify(newProfile, null, 2)
		editorStatus.hasChanges = false

		debug(`currentProfile: ${currentProfile.value.name}`)
		console.log("profile data: ", currentProfile.value)
	}

	const loadProfileFromFile = async (file: File): Promise<void> => {
		try {
			const profile = await ProfileLoader.fromFile(file);
			setCardProfile(profile)
			editorStatus.lastSavedState = JSON.stringify(profile, null, 2)
			editorStatus.hasChanges = false

			debug(`currentProfile from file: ${currentProfile.value.name}`)
			console.log("profile data: ", currentProfile.value)
		} catch (error) {
			throw new Error('Failed to load profile: ' + error);
		}
	}

	return {
		loadProfile,
		loadProfileFromFile,
	}
}

