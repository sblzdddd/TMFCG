import type { CardProfile, ICardProfile } from "./CardProfile";
import { CardProfileFactory } from "./CardProfileFactory";


export const ProfileLoader = {
	fromObject(object: ICardProfile): CardProfile {
		// Validate the profile structure
		if (!object.name || !Array.isArray(object.cards)) {
			throw new Error('Invalid profile format')
		}

		// Ensure all cards have required properties
		for (const card of object.cards) {
			if (
				typeof card.suit !== 'number' ||
				typeof card.number !== 'number' ||
				typeof card.character !== 'object' ||
				typeof card.character.variant !== 'string' ||
				typeof card.character.offsetY !== 'number' ||
				typeof card.character.offsetX !== 'number'
			) {
				throw new Error('Invalid card format: ' + JSON.stringify(card))
			}
		}
		return CardProfileFactory.createCardProfile(object);
	},

	fromJson(json: string): CardProfile {
		const object = JSON.parse(json) as ICardProfile;
		return this.fromObject(object);
	},

	fromFile(file: File): Promise<CardProfile> {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				const json = event.target?.result as string;
				resolve(this.fromJson(json));
			};
			reader.readAsText(file);
		});
	},
}
