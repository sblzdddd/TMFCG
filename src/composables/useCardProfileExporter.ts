import {useCardProfile} from "./useCardProfile";
import {useCardEditor} from "./useCardEditor";
import {useLogger} from "~/composables/useLogger";
import {ProfileExporter} from "~/lib/CardProfile";

export const useCardProfileExporter = () => {
	const {currentProfile} = useCardProfile();
	const {editorStatus} = useCardEditor()
	const {debug} = useLogger('profile:exporter');
	if (typeof window === 'undefined') {
		return {
			downloadProfile: () => {
			},
		}
	}

	const downloadProfile = () => {
		debug(`downloadProfile: ${currentProfile.value.name}`)
		ProfileExporter.toFile(currentProfile.value);
		editorStatus.lastSavedState = JSON.stringify(currentProfile.value, null, 2)
		editorStatus.hasChanges = false
	}
	return {
		downloadProfile,
	}
}

