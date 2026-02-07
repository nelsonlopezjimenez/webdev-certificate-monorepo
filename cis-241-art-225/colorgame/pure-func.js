// Pure utility functions
const randomInt = (max) => Math.floor(Math.random() * max);

const randomRGB = () => {
  const components = [randomInt(256), randomInt(256), randomInt(256)];
  return `rgb(${components.join(', ')})`;
};

const normalizeRGB = (rgb) => rgb.replace(/\s+/g, '');

const generateColors = (count) => 
  Array.from({ length: count }, randomRGB);

const pickRandom = (array) => array[randomInt(array.length)];

// Pure state transformations
const createInitialState = (numSquares = 6) => ({
  numSquares,
  colors: generateColors(numSquares),
  targetColor: null,
  message: '',
  gameWon: false
});

const withTargetColor = (state) => ({
  ...state,
  targetColor: pickRandom(state.colors)
});

const withNewColors = (numSquares) => (state) => 
  withTargetColor({
    ...createInitialState(numSquares),
    numSquares
  });

const withWin = (state) => ({
  ...state,
  message: 'Correct!',
  gameWon: true
});

const withWrongGuess = (state) => ({
  ...state,
  message: 'Try Again'
});

// DOM effects (side effects isolated)
const renderSquares = (state, elements) => {
  elements.squares.forEach((square, i) => {
    if (i < state.numSquares) {
      square.style.display = 'block';
      square.style.background = state.gameWon 
        ? state.targetColor 
        : state.colors[i];
    } else {
      square.style.display = 'none';
    }
  });
};

const renderUI = (state, elements) => {
  elements.colorDisplay.textContent = state.targetColor;
  elements.messageDisplay.textContent = state.message;
  elements.resetButton.textContent = state.gameWon ? 'Play Again?' : 'New Colors';
  elements.h1.style.background = state.gameWon ? state.targetColor : 'steelblue';
};

const render = (state, elements) => {
  renderSquares(state, elements);
  renderUI(state, elements);
};

// Event handler factories
const createSquareClickHandler = (getState, setState, elements) => (square, index) => {
  const state = getState();
  if (index >= state.numSquares || state.gameWon) return;

  const clickedColor = normalizeRGB(square.style.background);
  const targetColor = normalizeRGB(state.targetColor);

  if (clickedColor === targetColor) {
    const newState = withWin(state);
    setState(newState);
    render(newState, elements);
  } else {
    square.style.background = '#232323';
    const newState = withWrongGuess(state);
    setState(newState);
    renderUI(newState, elements);
  }
};

const createModeClickHandler = (setState, elements) => (button) => {
  elements.modeButtons.forEach(btn => btn.classList.remove('selected'));
  button.classList.add('selected');
  
  const numSquares = button.textContent === 'Easy' ? 3 : 6;
  const newState = withNewColors(numSquares)({});
  
  setState(newState);
  render(newState, elements);
};

const createResetHandler = (getState, setState, elements) => () => {
  const currentState = getState();
  const newState = withNewColors(currentState.numSquares)({});
  
  setState(newState);
  render(newState, elements);
};

// Main application
const initGame = () => {
  // Cache DOM
  const elements = {
    squares: document.querySelectorAll('.square'),
    colorDisplay: document.getElementById('colorDisplay'),
    messageDisplay: document.querySelector('#message'),
    h1: document.querySelector('h1'),
    resetButton: document.querySelector('#reset'),
    modeButtons: document.querySelectorAll('.mode')
  };

  // State management
  let currentState = withTargetColor(createInitialState(6));
  
  const getState = () => currentState;
  const setState = (newState) => { currentState = newState; };

  // Create handlers
  const handleSquareClick = createSquareClickHandler(getState, setState, elements);
  const handleModeClick = createModeClickHandler(setState, elements);
  const handleReset = createResetHandler(getState, setState, elements);

  // Bind events
  elements.squares.forEach((square, index) => {
    square.addEventListener('click', () => handleSquareClick(square, index));
  });

  elements.modeButtons.forEach(button => {
    button.addEventListener('click', () => handleModeClick(button));
  });

  elements.resetButton.addEventListener('click', handleReset);

  // Initial render
  render(currentState, elements);
};

// Initialize
initGame();

// ✅ Pure functions (no side effects except in render)
// ✅ Immutable state transformations
// ✅ Function composition
// ✅ Easy to test (pure functions)
// ✅ Closest to functional programming principles