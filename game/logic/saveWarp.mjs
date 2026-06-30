import { element } from "../data/domData.mjs";
import { gameData } from "../data/gameData.mjs";

export function addToInventory(pullResult) {
  console.log(pullResult.length);
  const finalResult = Array.isArray(pullResult) ? pullResult : [pullResult];

  finalResult.forEach((character) => {
    const foundChar = gameData.inventory.find(
      (item) => item.name === character.name,
    );

    if (foundChar) {
      foundChar.quantity += 1;
    } else {
      gameData.inventory.push({
        name: character.name,
        rarity: character.rarity,
        source: character.source,
        quantity: 1,
      });
    }
  });

  console.log(gameData);
}
