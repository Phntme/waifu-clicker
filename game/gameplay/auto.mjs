import { gameData } from "../data/gameData.mjs";
import { updateUI } from "../ui/updateUI.mjs";
import * as anim from "../ui/animation.mjs";
import { saveGame } from "../data/saveLoad.mjs";

let auto = gameData.upgrade[1].upgradeStatus; // valuenya true or false tergantung upgradeStatus pada gamedata (gamedata > upgrade array 1 > cari upgradestatus)

function startAuto() {
  if (auto) {
    //kalau upgrade autonya truthy maka kita bakal reset intervalnya
    clearInterval(auto);
  }

  if (gameData.upgrade[1].upgradeStatus === false) return; // kalau upgrade autonya false, skip

  // V ini sistem auto scorenya V

  auto = setInterval(() => {
    // ini nyimpen id setinterval ke variable auto (ditimpa) biar nanti timer bisa dihentikan

    const autoScore = //score dari auto didapet dari upgrade level auto dikali multiplier
      gameData.upgrade[1].upgradeLevel * gameData.upgrade[2].upgradeLevel;
    gameData.scorePoint += autoScore;
    updateUI();
    anim.scorePopup(autoScore.toFixed(1), "+");

    // cek multiplier aktif ga
    if (gameData.upgrade[2].upgradeLevel === 1) {
    } else {
      anim.multiPopup(gameData.upgrade[2].upgradeLevel); // kalau aktif munculin animasi multiplier
    }

    saveGame();
  }, gameData.upgrade[1].autoInterval);
}

export { startAuto };
