import {CardCharacter, type ICardCharacter} from "./CardCharacter";

export const CardCharacterFactory = {
  createCardCharacter(
    character: string,
    variant: string = "default",
    offsetX: number = 0,
    offsetY: number = 0
  ): CardCharacter {
    return new CardCharacter(character, variant, offsetX, offsetY);
  },

  createFromInterface(character: ICardCharacter): CardCharacter {
    return new CardCharacter(
      character.name,
      character.variant,
      character.offsetX,
      character.offsetY
    );
  },

  createDefaultCardCharacter(): CardCharacter {
    return new CardCharacter("【无角色】", "0", 0, 0);
  },
};
