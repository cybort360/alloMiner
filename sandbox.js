'use strict';

const startBtn = document.getElementById('startButton');
const mineBtn = document.getElementById('clickButton');
const tweetBtn = document.getElementById('tweetButton');
const alloCountDisplay = document.getElementById('alloCount');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');
const toggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

let allo = 0;
let timeLeft = 30;
let countdown = null;
let multiplierInterval = null;
let currentMultiplier = 1;

window.addEventListener('DOMContentLoaded', () => {
  const highScore = localStorage.getItem('highScore') || 0;
  const highScoreElement = document.createElement('p');
  highScoreElement.id = 'highScore';
  highScoreElement.style.fontSize = '1.2em';
  highScoreElement.textContent = `High Score: ${highScore} $ALLO`;
  document.querySelector('.container').insertBefore(highScoreElement, alloCountDisplay);
});

startBtn.addEventListener('click', () => {
  allo = 0;
  timeLeft = 30;
  currentMultiplier = 1;

  alloCountDisplay.textContent = `${allo} $ALLO`;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  message.textContent = '';

  startBtn.style.display = 'none';
  mineBtn.style.display = 'inline-block';
  tweetBtn.style.display = 'none';

  clearInterval(countdown);
  clearInterval(multiplierInterval);

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      clearInterval(multiplierInterval);
      mineBtn.style.display = 'none';
      tweetBtn.style.display = 'inline-block';

      const highScore = localStorage.getItem('highScore') || 0;

      if (allo > highScore) {
        localStorage.setItem('highScore', allo);
        message.textContent = `🎉 New High Score! You mined ${allo} $ALLO.`;
        const highScoreDisplay = document.getElementById('highScore');
        if (highScoreDisplay) {
          highScoreDisplay.textContent = `High Score: ${allo} $ALLO`;
        }
      } else {
        message.textContent = `Time's up! You mined ${allo} $ALLO. High Score: ${highScore}`;
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, 1000);

  multiplierInterval = setInterval(() => {
    const chance = Math.random();

    if (chance < 0.05) {
      activateMultiplier(5, '⚡ SUPER BOOST! 5x Mining for 5 seconds!', 'super-glow');
    } else if (chance < 0.4) {
      const boost = Math.random() < 0.5 ? 2 : 3;
      activateMultiplier(boost, `🔥 ${boost}x Mining Boost! Click fast!`, 'glow');
    }
  }, 4000);
});

function activateMultiplier(boostValue, boostMessage, glowClass) {
  currentMultiplier = boostValue;
  message.textContent = boostMessage;
  mineBtn.classList.add(glowClass);

  setTimeout(() => {
    currentMultiplier = 1;
    message.textContent = '';
    mineBtn.classList.remove(glowClass);
  }, 5000);
}

mineBtn.addEventListener('click', () => {
  allo += currentMultiplier;
  alloCountDisplay.textContent = `${allo} $ALLO${currentMultiplier > 1 ? ` (+${currentMultiplier}x!)` : ''}`;

  mineBtn.classList.add('bounce');
  setTimeout(() => mineBtn.classList.remove('bounce'), 300);
});

tweetBtn.addEventListener('click', () => {
  const tweetText = encodeURIComponent(
    `I just mined ${allo} $ALLO tokens in 30 seconds playing the $ALLO Miner Game!\nTry it yourself here: https://allominer.vercel.app`
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(tweetUrl, '_blank');

  startBtn.style.display = 'inline-block';
  tweetBtn.style.display = 'none';
  timerDisplay.textContent = 'Time left: 30s';
});

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');

  if (document.body.classList.contains('dark')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  } else {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  }
});
