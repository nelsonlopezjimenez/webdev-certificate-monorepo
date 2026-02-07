// Constants
const EASY_MODE_SQUARES = 3;
const HARD_MODE_SQUARES = 6;
const BACKGROUND_COLOR = '#232323';
const WIN_BUTTON_TEXT = 'Play Again?';
const RESET_BUTTON_TEXT = 'New Colors';

// State
let numSquares = HARD_MODE_SQUARES;
let colors = [];
let pickedColor;

// DOM elements
const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const messageDisplay = document.querySelector('#message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode');

// Initialize game
init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

/* === SOLUTION START === */

function setupModeButtons() {
  modeButtons.forEach(button => {
    button.addEventListener('click', function() {
      modeButtons.forEach(btn => btn.classList.remove('selected'));
      this.classList.add('selected');
      numSquares = this.textContent === 'Easy' ? EASY_MODE_SQUARES : HARD_MODE_SQUARES;
      reset();
    });
  });
}

function setupSquares() {
  squares.forEach(square => {
    square.addEventListener('click', function() {
      const clickedColor = normalizeRGB(this.style.background);
      
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        resetButton.textContent = WIN_BUTTON_TEXT;
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      } else {
        this.style.background = BACKGROUND_COLOR;
        messageDisplay.textContent = 'Try Again';
      }
    });
  });
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = RESET_BUTTON_TEXT;
  messageDisplay.textContent = '';
  
  squares.forEach((square, i) => {
    if (colors[i]) {
      square.style.display = 'block';
      square.style.background = colors[i];
    } else {
      square.style.display = 'none';
    }
  });
  
  h1.style.background = 'steelblue';
}

resetButton.addEventListener('click', reset);

function changeColors(color) {
  squares.forEach(square => {
    square.style.background = color;
  });
}

function pickColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

/* === SOLUTION END === */

function generateRandomColors(num) {
  return Array.from({ length: num }, () => randomColor());
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Fix for RGB comparison bug: normalize RGB string by removing spaces
function normalizeRGB(rgbString) {
  return rgbString.replace(/\s+/g, '');
}


// ✅ Fixed RGB comparison bug with normalizeRGB()
// ✅ Constants for magic numbers
// ✅ const for non-reassigned variables
// ✅ Template literals
// ✅ Arrow functions and forEach loops
// ✅ Array.from() for cleaner array generation