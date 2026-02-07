// Factory function creates game instances version 4
function createColorGame() {
  // Constants
  const EASY_MODE = 3;
  const HARD_MODE = 6;
  const BACKGROUND_COLOR = '#232323';
  const DEFAULT_H1_COLOR = 'steelblue';

  // Private state
  let numSquares = HARD_MODE;
  let colors = [];
  let targetColor = null;

  // Cache DOM
  const elements = {
    squares: document.querySelectorAll('.square'),
    colorDisplay: document.getElementById('colorDisplay'),
    messageDisplay: document.querySelector('#message'),
    h1: document.querySelector('h1'),
    resetButton: document.querySelector('#reset'),
    modeButtons: document.querySelectorAll('.mode')
  };

  // Utility functions
  const randomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const normalizeRGB = (rgbString) => rgbString.replace(/\s+/g, '');

  const generateColors = (num) => Array.from({ length: num }, randomRGB);

  const pickRandomColor = (colorArray) => {
    const index = Math.floor(Math.random() * colorArray.length);
    return colorArray[index];
  };

  // Square operations
  const showSquare = (square, color) => {
    square.style.display = 'block';
    square.style.background = color;
  };

  const hideSquare = (square) => {
    square.style.display = 'none';
  };

  const fadeSquare = (square) => {
    square.style.background = BACKGROUND_COLOR;
  };

  const updateSquares = () => {
    elements.squares.forEach((square, i) => {
      if (i < numSquares) {
        showSquare(square, colors[i]);
      } else {
        hideSquare(square);
      }
    });
  };

  const changeAllSquares = (color) => {
    elements.squares.forEach(square => {
      square.style.background = color;
    });
  };

  // Event handlers
  const handleSquareClick = (square) => {
    const clickedColor = normalizeRGB(square.style.background);
    const normalizedTarget = normalizeRGB(targetColor);

    if (clickedColor === normalizedTarget) {
      elements.messageDisplay.textContent = 'Correct!';
      elements.resetButton.textContent = 'Play Again?';
      changeAllSquares(targetColor);
      elements.h1.style.background = targetColor;
    } else {
      fadeSquare(square);
      elements.messageDisplay.textContent = 'Try Again';
    }
  };

  const handleModeClick = (button) => {
    elements.modeButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    numSquares = button.textContent === 'Easy' ? EASY_MODE : HARD_MODE;
    reset();
  };

  // Main reset function
  const reset = () => {
    colors = generateColors(numSquares);
    targetColor = pickRandomColor(colors);
    
    elements.colorDisplay.textContent = targetColor;
    elements.resetButton.textContent = 'New Colors';
    elements.messageDisplay.textContent = '';
    elements.h1.style.background = DEFAULT_H1_COLOR;
    
    updateSquares();
  };

  // Bind events
  const init = () => {
    elements.squares.forEach(square => {
      square.addEventListener('click', () => handleSquareClick(square));
    });

    elements.modeButtons.forEach(button => {
      button.addEventListener('click', () => handleModeClick(button));
    });

    elements.resetButton.addEventListener('click', reset);

    reset();
  };

  // Public API
  return {
    init,
    reset,
    getState: () => ({ numSquares, targetColor, colors })
  };
}

// Initialize
const game = createColorGame();
game.init();

// ✅ Closure-based private state
// ✅ Returns public API only
// ✅ No this keyword confusion
// ✅ Easy to test individual functions
// ✅ Can create multiple instances