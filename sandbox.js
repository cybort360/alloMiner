const startBtn = document.getElementById('startButton');
const mineBtn = document.getElementById('clickButton');
const tweetBtn = document.getElementById('tweetButton');
const alloCountDisplay = document.getElementById('alloCount');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');

let allo = 0;
let timeLeft = 30;
let countdown;
let multiplierInterval;
let currentMultiplier = 1;

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

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      clearInterval(multiplierInterval);
      mineBtn.style.display = 'none';
      tweetBtn.style.display = 'inline-block';
      message.textContent = `Time's up! You mined ${allo} $ALLO. Tweet your score to try again.`;
    }
  }, 1000);

  multiplierInterval = setInterval(() => {
    const chance = Math.random();

    if (chance < 0.05) {
      currentMultiplier = 5;
      message.textContent = `⚡ SUPER BOOST! 5x Mining for 5 seconds!`;
      mineBtn.classList.add('super-glow');

      setTimeout(() => {
        currentMultiplier = 1;
        message.textContent = '';
        mineBtn.classList.remove('super-glow');
      }, 5000);
    } else if (chance < 0.4) {
      currentMultiplier = Math.random() < 0.5 ? 2 : 3;
      message.textContent = `🔥 ${currentMultiplier}x Mining Boost! Click fast!`;
      mineBtn.classList.add('glow');

      setTimeout(() => {
        currentMultiplier = 1;
        message.textContent = '';
        mineBtn.classList.remove('glow');
      }, 5000);
    }
  }, 4000);
});

mineBtn.addEventListener('click', () => {
  allo += currentMultiplier;
  alloCountDisplay.textContent = `${allo} $ALLO${currentMultiplier > 1 ? ` (+${currentMultiplier}x!)` : ''}`;

  mineBtn.classList.add('bounce');
  setTimeout(() => mineBtn.classList.remove('bounce'), 300);
});

tweetBtn.addEventListener('click', () => {
  const tweetText = encodeURIComponent(
    `I just mined ${allo} $ALLO tokens in 30 seconds playing the Allora Miner Game! Try it yourself.`
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(tweetUrl, '_blank');

  startBtn.style.display = 'inline-block';
  tweetBtn.style.display = 'none';
  timerDisplay.textContent = 'Time left: 30s';
});

// Theme toggle
const toggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

toggle.addEventListener('click', () => {
  const body = document.body;
  body.classList.toggle('dark');
  body.classList.toggle('light');

  if (body.classList.contains('dark')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  } else {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  }
});
