let eggCount = 0;
let multiplier = 1;
let autoClickerActive = false;
let autoClickerInterval = null;

const multiplierText = document.getElementById("multiplierText");
const collectButton = document.getElementById("collectButton");
const eggCounterDiv = document.getElementById("eggCounter");
const upgradeButton = document.getElementById("upgradeButton");
const resetButton = document.getElementById("resetButton");
const autoClickerButton = document.getElementById("autoClick");
const originalAutoClickButtonText = autoClickerButton.textContent;
const originalMultiplierText = multiplierText.textContent;

function updateDisplay() {
  eggCounterDiv.textContent = `You have collected ${eggCount} eggs!`;
  multiplierText.textContent = `${multiplier}`;
}

function collectEgg() {
  eggCount += multiplier;
  updateDisplay();
}

function purchaseUpgrade() {
  if (eggCount < 20) {
    eggCounterDiv.textContent = `You need at least 20 eggs
        to purchase this upgrade. You only have ${eggCount}`;
  } else if (eggCount >= 20) {
    eggCount -= 20;
    multiplier = multiplier * 2;
    updateDisplay();
  }
}

function purchaseAutoClicker() {
  if (eggCount >= 500) {
    eggCount -= 500;

    autoClickerActive = true;
    autoClickerButton.disabled = true;
    autoClickerButton.textContent = "Auto Clicker Active!";

    autoClickerInterval = setInterval(() => {
      eggCount += multiplier;
      updateDisplay();
    }, 500);

    updateDisplay();
  } else {
    eggCounterDiv.textContent = `You need at least 500 eggs
        to purchase this upgrade. You only have ${eggCount}.`;
  }
}

function resetGame() {
  eggCount = 0;
  multiplier = 1;
  autoClickerActive = false;

  if (autoClickerInterval !== null) {
    clearInterval(autoClickerInterval);
    autoClickerInterval = null;
  }

  autoClickerButton.disabled = false;
  autoClickerButton.textContent = originalAutoClickButtonText;
  multiplierText.textContent = originalMultiplierText;

  updateDisplay();
}

collectButton.addEventListener("click", collectEgg);
upgradeButton.addEventListener("click", purchaseUpgrade);
autoClickerButton.addEventListener("click", purchaseAutoClicker);
resetButton.addEventListener("click", resetGame);
updateDisplay();
