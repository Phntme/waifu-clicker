import { gameData } from "./gameData.mjs";
import { updateUI } from "../ui/updateUI.mjs";
import { startAuto } from "../gameplay/auto.mjs";

// save game function
export function saveGame() {
  const gameSaveData = JSON.stringify(gameData);
  localStorage.setItem("waifuData", gameSaveData);
}

// load game function
export function loadGame() {
  const rawData = localStorage.getItem("waifuData"); // ambil save dari local storage

  if (!rawData) return saveGame(); // kalau savefilenya kosong maka save gamenya dengan default value pada gamedata

  const loadedData = JSON.parse(rawData); // kalau user sudah punya savedata, maka parse rawdata itu biar bisa dibaca js (string dijadiin object)
  Object.assign(gameData, loadedData); // timpa gamedata default dengan gamedata punya user
  updateUI(); // lakukan update ui
  startAuto(); // jalankan auto
}

export function initUpgradeAnimations() {
  gameData.upgrade.find((upgrade) => upgrade.upgradeName === "tap").animation =
    document.getElementById("tap-status");

  gameData.upgrade.find((upgrade) => upgrade.upgradeName === "auto").animation =
    document.getElementById("auto-status");

  gameData.upgrade.find(
    (upgrade) => upgrade.upgradeName === "multi",
  ).animation = document.getElementById("multi-status");
}
