import { charPool } from "../data/charData.mjs";
import { gameData } from "../data/gameData.mjs";
import { duitKurang } from "./economy.mjs";
import { showResult } from "../ui/warpPanel.mjs";
import * as anim from "../ui/animation.mjs";
import { updateUI } from "../ui/updateUI.mjs";
import { element } from "../data/domData.mjs";
import { addToInventory } from "./saveWarp.mjs";

let userInventory = [];
let currentPullState = null;
let resultNow = [];
const currentCardIndex = 0;

function warpHandler(pullType) {
  resultNow = [];
  let singleCost = gameData.warp.price.single;
  let multiCost = gameData.warp.price.multi;
  currentPullState = pullType;

  if (pullType === "single") {
    if (checkWarp(singleCost, gameData.scorePoint)) {
      berhasilWarp(singleCost); //kurangi duit user

      const currentResult = singlePull();
      resultNow.push(currentResult); // masukkan hasil pull ke resultNow variable
      userInventory.push(currentResult);
      // console.log(userInventory);
      addToInventory(currentResult);
      // console.log(gameData);

      anim.doWarpAnimation(); // lakukan animasi warp
      showResult();
      displayCard(currentCardIndex, resultNow);
      // warpShowcase(currentPullState, resultNow);
    } else {
      duitKurang(singleCost);
    }
  } else {
    if (checkWarp(multiCost, gameData.scorePoint)) {
      berhasilWarp(multiCost);

      const currentResult = multiPull();
      resultNow.push(...currentResult);
      userInventory.push(...currentResult);
      addToInventory(currentResult);
      console.log(
        "ini adalah current result yang tidak dispread ",
        currentResult,
      );

      anim.doWarpAnimation();

      showResult();
      displayCard(currentCardIndex, resultNow);
    } else {
      duitKurang(multiCost);
    }

    // saveGacha();
  }

  updateUI();
}

function berhasilWarp(harga) {
  gameData.scorePoint -= harga;
}

function checkWarp(warpCost, userPoint) {
  if (userPoint >= warpCost) {
    return true;
  } else return false;
}

function getRandomFrom(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function singlePull() {
  let chance = Math.random() * 100;
  if (chance <= 1) {
    return getRandomFrom(charPool[5]);
  } else if (chance <= 11) {
    return getRandomFrom(charPool[4]);
  } else {
    return getRandomFrom(charPool[3]);
  }
}

function multiPull() {
  const multiResult = [];
  for (let multiCount = 0; multiCount < 10; multiCount++) {
    multiResult.push(singlePull());
  }
  return multiResult;
}

function createWarpCard(name, rarity, img) {
  return ` <div class="result-wrapper">
  <div class="result">
              <h1 class="result__header">
                You got a
                <span class="highlight" id="result-rarity">${rarity}</span> star
                character
                <span class="highlight" id="result-name">${name}</span>
              </h1>
              <img
                id="result-img"
                src="${img}"
                class="result-img"
                alt=""
              />
            </div>
            </div>`;
}

function displayCard(index, source) {
  const name = source[index].name;
  const rarity = source[index].rarity;
  const img = source[index].source;

  const card = createWarpCard(name, rarity, img);

  element.warp.result.innerHTML = card;
}

function resultHandler() {
  if (currentPullState === "single") {
    element.warp.result.classList.remove("active");
    resultNow.shift();
  } else if (currentPullState === "multi" && resultNow.length > 1) {
    resultNow.shift();

    displayCard(currentCardIndex, resultNow);
  } else {
    element.warp.result.classList.remove("active");
  }
}
export { warpHandler, resultHandler };
