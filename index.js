let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const updateScore = () => {
  const scoreElement = document.querySelector(".score");
  scoreElement.innerHTML = `Win ${score.wins} , tie: ${score.ties} , Losses: ${score.losses} `;
};

updateScore();

const computerPickup = () => {
  const randomNumber = Math.random();
  let computerMove;

  if (randomNumber <= 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber > 2 / 3) {
    computerMove = "scissors";
  }

  return computerMove;
};

const palyerMove = (userMove) => {
  const computerMove = computerPickup();
  const resultElement = document.querySelector(".result");
  const movesElement = document.querySelector(".moves");
  movesElement.innerHTML = `You <img src='/images/${userMove}-emoji.png' alt='${userMove}' class='move-icon'/> , <img src='/images/${computerMove}-emoji.png' alt='${computerMove}' class='move-icon'/> Computer`;
  if (userMove === computerMove) {
    resultElement.innerHTML = `Tie.`;
    score.ties += 1;
  } else if (
    (userMove === "rock" && computerMove === "scissors") ||
    (userMove === "paper" && computerMove === "rock") ||
    (userMove === "scissors" && computerMove === "paper")
  ) {
    resultElement.innerHTML = `Win.`;
    score.wins += 1;
  } else {
    resultElement.innerHTML = `Losses.`;
    score.losses += 1;
  }
  updateScore();
  localStorage.setItem("score", JSON.stringify(score));
};

const resetScore = () => {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  updateScore();
  localStorage.removeItem("score");
  if (autoPalyIsActive) {
    handleAutoPlay();
  }
};

let autoPalyIsActive = false;
let intervalId = "";

const handleAutoPlay = () => {
  if (!autoPalyIsActive) {
    intervalId = setInterval(() => {
      const autoUserMove = computerPickup();
      palyerMove(autoUserMove);
    }, 1000);
    autoPalyIsActive = true;
  } else {
    clearInterval(intervalId);
    autoPalyIsActive = false;
  }
};
