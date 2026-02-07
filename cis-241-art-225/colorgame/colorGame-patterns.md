# Functional Pattern Versions - ColorGame

## Version 4: Factory Function Pattern

```javascript
// Factory function creates game instances
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
```

**Characteristics:**
- ✅ Closure-based private state
- ✅ Returns public API only
- ✅ No `this` keyword confusion
- ✅ Easy to test individual functions
- ✅ Can create multiple instances

---

## Version 5: Module Pattern (IIFE)

```javascript
const ColorGame = (() => {
  // Constants
  const CONFIG = {
    EASY_MODE: 3,
    HARD_MODE: 6,
    BACKGROUND_COLOR: '#232323',
    DEFAULT_H1_COLOR: 'steelblue',
    MESSAGES: {
      WIN: 'Correct!',
      LOSE: 'Try Again'
    }
  };

  // Private state
  let state = {
    numSquares: CONFIG.HARD_MODE,
    colors: [],
    targetColor: null,
    elements: {}
  };

  // Private utility functions
  const utils = {
    randomRGB: () => {
      const rgb = Array.from({ length: 3 }, () => 
        Math.floor(Math.random() * 256)
      );
      return `rgb(${rgb.join(', ')})`;
    },

    normalizeRGB: (rgbString) => rgbString.replace(/\s+/g, ''),

    generateColors: (num) => 
      Array.from({ length: num }, utils.randomRGB),

    pickRandom: (array) => 
      array[Math.floor(Math.random() * array.length)]
  };

  // Private DOM functions
  const dom = {
    cache: () => {
      state.elements = {
        squares: document.querySelectorAll('.square'),
        colorDisplay: document.getElementById('colorDisplay'),
        messageDisplay: document.querySelector('#message'),
        h1: document.querySelector('h1'),
        resetButton: document.querySelector('#reset'),
        modeButtons: document.querySelectorAll('.mode')
      };
    },

    updateSquare: (square, index) => {
      if (index < state.numSquares) {
        square.style.display = 'block';
        square.style.background = state.colors[index];
      } else {
        square.style.display = 'none';
      }
    },

    updateAllSquares: () => {
      state.elements.squares.forEach(dom.updateSquare);
    },

    setMessage: (message) => {
      state.elements.messageDisplay.textContent = message;
    },

    setHeaderColor: (color) => {
      state.elements.h1.style.background = color;
    },

    changeAllSquaresTo: (color) => {
      state.elements.squares.forEach(square => {
        square.style.background = color;
      });
    }
  };

  // Private game logic
  const game = {
    setupColors: () => {
      state.colors = utils.generateColors(state.numSquares);
      state.targetColor = utils.pickRandom(state.colors);
    },

    handleCorrectGuess: () => {
      dom.setMessage(CONFIG.MESSAGES.WIN);
      state.elements.resetButton.textContent = 'Play Again?';
      dom.changeAllSquaresTo(state.targetColor);
      dom.setHeaderColor(state.targetColor);
    },

    handleWrongGuess: (square) => {
      square.style.background = CONFIG.BACKGROUND_COLOR;
      dom.setMessage(CONFIG.MESSAGES.LOSE);
    },

    checkGuess: (square) => {
      const clickedColor = utils.normalizeRGB(square.style.background);
      const normalizedTarget = utils.normalizeRGB(state.targetColor);

      if (clickedColor === normalizedTarget) {
        game.handleCorrectGuess();
      } else {
        game.handleWrongGuess(square);
      }
    }
  };

  // Private event handlers
  const handlers = {
    onSquareClick: (square) => {
      game.checkGuess(square);
    },

    onModeClick: (button) => {
      state.elements.modeButtons.forEach(btn => 
        btn.classList.remove('selected')
      );
      button.classList.add('selected');
      
      state.numSquares = button.textContent === 'Easy' 
        ? CONFIG.EASY_MODE 
        : CONFIG.HARD_MODE;
      
      publicAPI.reset();
    },

    onResetClick: () => {
      publicAPI.reset();
    }
  };

  // Private initialization
  const bindEvents = () => {
    state.elements.squares.forEach(square => {
      square.addEventListener('click', () => handlers.onSquareClick(square));
    });

    state.elements.modeButtons.forEach(button => {
      button.addEventListener('click', () => handlers.onModeClick(button));
    });

    state.elements.resetButton.addEventListener('click', handlers.onResetClick);
  };

  // Public API
  const publicAPI = {
    init: () => {
      dom.cache();
      bindEvents();
      publicAPI.reset();
    },

    reset: () => {
      game.setupColors();
      state.elements.colorDisplay.textContent = state.targetColor;
      state.elements.resetButton.textContent = 'New Colors';
      dom.setMessage('');
      dom.setHeaderColor(CONFIG.DEFAULT_H1_COLOR);
      dom.updateAllSquares();
    },

    // Exposed for debugging/testing
    getState: () => ({
      numSquares: state.numSquares,
      targetColor: state.targetColor,
      colors: [...state.colors]
    })
  };

  return publicAPI;
})();

// Initialize
ColorGame.init();
```

**Characteristics:**
- ✅ Single instance (singleton pattern)
- ✅ Complete encapsulation
- ✅ Organized into logical sections
- ✅ No global pollution except one variable
- ✅ Clear separation: utils, dom, game logic, handlers

---

## Version 6: Pure Functional + Composition

```javascript
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
```

**Characteristics:**
- ✅ Pure functions (no side effects except in render)
- ✅ Immutable state transformations
- ✅ Function composition
- ✅ Easy to test (pure functions)
- ✅ Closest to functional programming principles

---

## Version 7: React Hooks (Bonus)

```javascript
import React, { useState, useEffect, useCallback } from 'react';
import './ColorGame.css';

// Pure utility functions
const randomRGB = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateColors = (count) => 
  Array.from({ length: count }, randomRGB);

const pickRandom = (array) => 
  array[Math.floor(Math.random() * array.length)];

const normalizeRGB = (rgb) => rgb.replace(/\s+/g, '');

// Custom hook for game logic
const useColorGame = (initialMode = 'hard') => {
  const [mode, setMode] = useState(initialMode);
  const [colors, setColors] = useState([]);
  const [targetColor, setTargetColor] = useState('');
  const [message, setMessage] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [hiddenSquares, setHiddenSquares] = useState(new Set());

  const numSquares = mode === 'easy' ? 3 : 6;

  const resetGame = useCallback(() => {
    const newColors = generateColors(numSquares);
    const newTarget = pickRandom(newColors);
    
    setColors(newColors);
    setTargetColor(newTarget);
    setMessage('');
    setGameWon(false);
    setHiddenSquares(new Set());
  }, [numSquares]);

  const checkGuess = useCallback((color, index) => {
    if (gameWon || hiddenSquares.has(index)) return;

    if (normalizeRGB(color) === normalizeRGB(targetColor)) {
      setMessage('Correct!');
      setGameWon(true);
    } else {
      setMessage('Try Again');
      setHiddenSquares(prev => new Set([...prev, index]));
    }
  }, [targetColor, gameWon, hiddenSquares]);

  const changeMode = useCallback((newMode) => {
    setMode(newMode);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return {
    colors,
    targetColor,
    message,
    gameWon,
    hiddenSquares,
    numSquares,
    mode,
    resetGame,
    checkGuess,
    changeMode
  };
};

// Square component
const Square = ({ color, onClick, isHidden, isWinner }) => (
  <div
    className="square"
    style={{
      background: isHidden ? '#232323' : color,
      display: isHidden && !isWinner ? 'none' : 'block'
    }}
    onClick={onClick}
  />
);

// Mode button component
const ModeButton = ({ mode, currentMode, onClick, children }) => (
  <button
    className={`mode ${mode === currentMode ? 'selected' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Main component
const ColorGame = () => {
  const {
    colors,
    targetColor,
    message,
    gameWon,
    hiddenSquares,
    numSquares,
    mode,
    resetGame,
    checkGuess,
    changeMode
  } = useColorGame('hard');

  return (
    <>
      <h1 style={{ background: gameWon ? targetColor : 'steelblue' }}>
        The Great
        <br />
        <span id="colorDisplay">{targetColor}</span>
        <br />
        Color Game
      </h1>

      <div id="stripe">
        <button id="reset" onClick={resetGame}>
          {gameWon ? 'Play Again?' : 'New Colors'}
        </button>
        <span id="message">{message}</span>
        <ModeButton mode="easy" currentMode={mode} onClick={() => changeMode('easy')}>
          Easy
        </ModeButton>
        <ModeButton mode="hard" currentMode={mode} onClick={() => changeMode('hard')}>
          Hard
        </ModeButton>
      </div>

      <div id="container">
        {colors.map((color, index) => (
          <Square
            key={index}
            color={color}
            onClick={() => checkGuess(color, index)}
            isHidden={hiddenSquares.has(index) || index >= numSquares}
            isWinner={gameWon}
          />
        ))}
      </div>
    </>
  );
};

export default ColorGame;
```

**Characteristics:**
- ✅ Custom hooks for logic reuse
- ✅ Component composition
- ✅ Declarative UI
- ✅ State management with hooks
- ✅ Industry standard React pattern

---

## Comparison Table

| Pattern | Lines | Testability | Readability | Industry Use | Teaching Value |
|---------|-------|-------------|-------------|--------------|----------------|
| **Class (OOP)** | ~150 | Medium | Medium | Legacy/Backend | OOP concepts |
| **Factory** | ~120 | High | High | Common | Closures, encapsulation |
| **Module (IIFE)** | ~140 | High | High | Very Common | Organization, scope |
| **Pure Functional** | ~130 | Very High | Medium | Growing | FP principles |
| **React Hooks** | ~110 | High | Very High | **Standard** | Modern React |

## Best Practices Demonstrated

### All Versions Fix:
1. ✅ RGB comparison bug (normalization)
2. ✅ Magic numbers → constants
3. ✅ Template literals
4. ✅ Array methods over loops

### Pattern-Specific Strengths:

**Factory Function:**
- Easy to understand
- Good for creating multiple instances
- Teaches closures naturally

**Module Pattern:**
- Single instance when needed
- Clear organization
- No global pollution

**Pure Functional:**
- Easiest to test
- Immutable data
- Predictable behavior
- Separates logic from effects

**React Hooks:**
- What students will actually write
- Component reusability
- State management built-in

## Recommendation for Teaching Sequence

1. **Week 1-2:** Start with optimized procedural (Version 1)
2. **Week 3-4:** Factory functions (Version 4) - teaches closures
3. **Week 5:** Module pattern (Version 5) - teaches organization
4. **Week 6:** Brief class overview (for reading legacy code)
5. **React Section:** Hooks pattern (Version 7) - current standard

**Skip pure functional (Version 6) unless:**
- Advanced students
- Covering FP paradigm specifically
- Preparing for interviews at FP-focused companies

Most students will use **Factory Functions** and **React Hooks** in their careers.