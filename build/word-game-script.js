// ChatGPT Conversation Links:
// 1. https://chatgpt.com/share/67b2bb24-1dec-800b-a7c8-8e755ef29b9e
// 2.
// Add as many links as needed

let words = ["PIZZA", "UNICORN", "ROBOT", "BANANA", "SPACESHIP", "NINJA"];

let currentWord = "";
let guessedLetters = [];
let lives = 6;
let timerInterval;
let timeLeft = 30;

let gameContent = document.getElementById("game-content");
let classicModeBtn = document.getElementById("classic-mode");
let timeModeBtn = document.getElementById("time-mode");
let wordContainer = document.getElementById("word-container");
let livesDisplay = document.getElementById("lives-count");
let messageDisplay = document.getElementById("message");
let keys = document.querySelectorAll(".key");
let timerDisplay = document.getElementById("time-left");

function startGame() {
  let randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  guessedLetters = [];
  lives = 6;
  timeLeft = 30;
  clearInterval(timerInterval);
  gameContent.style.display = "block";
  livesDisplay.textContent = lives;
  messageDisplay.textContent = "";
  timerDisplay.textContent = timeLeft;

  updateWordDisplay();
  enableAllKeys();
}

function updateWordDisplay() {
  wordContainer.innerHTML = "";

  for (let i = 0; i < currentWord.length; i++) {
    let span = document.createElement("span");
    span.textContent = guessedLetters.includes(currentWord[i]) ? currentWord[i] : "_";
    span.className = "word-underscore";
    wordContainer.appendChild(span);
  }

  checkWin();
}

function handleGuess(letter) {
  if (guessedLetters.length === 0 && timeModeBtn.disabled) {
    startTimer();
  }

  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    if (currentWord.includes(letter)) {
      updateWordDisplay();
    } else {
      lives--;
      livesDisplay.textContent = lives;
      if (lives === 0) {
        messageDisplay.textContent = "Game Over! The word was: " + currentWord + ". Better luck next time!";
        disableAllKeys();
        clearInterval(timerInterval);
      }
    }
  }
}


function checkWin() {
  let allRevealed = true;
  for (let char of currentWord) {
    if (!guessedLetters.includes(char)) {
      allRevealed = false;
      break;
    }
  }
  if (allRevealed) {
    messageDisplay.textContent = "You won! 🎉 Great job!";
    disableAllKeys();
    clearInterval(timerInterval);
  }
}


keys.forEach(key => {
  key.addEventListener("click", () => {
    handleGuess(key.dataset.key.toUpperCase());
    key.disabled = true;
  });
});

window.addEventListener("keydown", (event) => {
  let letter = event.key.toUpperCase();
  if (/^[A-Z]$/.test(letter)) {
    let button = document.querySelector(`.key[data-key='${letter.toLowerCase()}']`);
    if (button && !button.disabled) {
      handleGuess(letter);
      button.disabled = true;
    }
  }
});

function enableAllKeys() {
  keys.forEach(key => key.disabled = false);
}

function disableAllKeys() {
  keys.forEach(key => key.disabled = true);
}

function startTimer() {
  document.getElementById("timer").style.display = "block";
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      messageDisplay.textContent = "Time's up! The word was: " + currentWord + ".";
      disableAllKeys();
    }
  }, 1000);
}

classicModeBtn.addEventListener("click", () => {
  timeModeBtn.disabled = false;
  startGame();
});

timeModeBtn.addEventListener("click", () => {
  timeModeBtn.disabled = true;
  startGame();
});

