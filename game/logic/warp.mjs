import { charPool } from "../data/charData.mjs";
import { gameData } from "../data/gameData.mjs";
import { duitKurang } from "./economy.mjs";
import { showResult } from "../ui/warpPanel.mjs";
import * as anim from "../ui/animation.mjs";
import { updateUI } from "../ui/updateUI.mjs";
import { element } from "../data/domData.mjs";

function warpHandler(pullType) {
  let singleCost = gameData.warp.price.single;
  let multiCost = gameData.warp.price.multi;
  let resultNow = [];

  if (pullType === "single") {
    if (checkWarp(singleCost, gameData.scorePoint)) {
      berhasilWarp(singleCost); //kurangi duit user
      resultNow.push(singlePull()); // masukkan hasil pull ke resultNow variable
      anim.doWarpAnimation(); // lakukan animasi warp
      showResult();
      warpShowcase(pullType, resultNow);
    } else {
      duitKurang(singleCost);
    }
  } else {
    if (checkWarp(multiCost, gameData.scorePoint)) {
      berhasilWarp(multiCost);
      resultNow.push(...multiPull());
      anim.doWarpAnimation();
      showResult();
      warpShowcase(pullType, resultNow);
    } else {
      duitKurang(multiCost);
    }
  }
  console.log(resultNow);

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
  console.log(multiResult);
  return multiResult;
}

function warpShowcase(type, source) {
  if (type === "single") {
    element.warp.name.textContent = source[0].name;
    element.warp.rarity.textContent = source[0].rarity;
    element.warp.img.src = source[0].source;
  } else {
    for (let i = 0; i < 10; i++) {
      element.warp.name.textContent = source[i].name;
      element.warp.rarity.textContent = source[i].rarity;
      element.warp.img.src = source[i].source;
    }
  }
}

export { warpHandler };
