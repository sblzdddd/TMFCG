import type { ICardProfile } from "./CardProfile";


export const ProfileExporter = {
	toJson(profile: ICardProfile): string {
		return JSON.stringify(profile);
	},

	toFile(profile: ICardProfile): void {
		const dataStr = JSON.stringify(profile, null, 2)
		const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

		const exportFileDefaultName = `${profile.name}.json`

		const linkElement = document.createElement('a')
		linkElement.setAttribute('href', dataUri)
		linkElement.setAttribute('download', exportFileDefaultName)
		linkElement.click()

	}
}
