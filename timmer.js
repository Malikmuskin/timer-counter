let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;
let currentMode = 'pomodoro';

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const stopButton = document.getElementById('stop');
const pomodoroButton = document.getElementById('pomodoro');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const alertSound = document.getElementById('alert');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft === 0) {
        clearInterval(timer);
        isRunning = false;
        alertSound.play();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  switch (currentMode) {
    case 'pomodoro':
      timeLeft = 1500;
      break;
    case 'shortBreak':
      timeLeft = 300;
      break;
    case 'longBreak':
      timeLeft = 900;
      break;
  }
  updateTimerDisplay();
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 0;
  updateTimerDisplay();
}

function switchMode(mode) {
  currentMode = mode;
  resetTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
stopButton.addEventListener('click', stopTimer);
pomodoroButton.addEventListener('click', () => switchMode('pomodoro'));
shortBreakButton.addEventListener('click', () => switchMode('shortBreak'));
longBreakButton.addEventListener('click', () => switchMode('longBreak'));

// Initialize timer display
updateTimerDisplay();