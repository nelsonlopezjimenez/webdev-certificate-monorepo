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

//  Single instance (singleton pattern)
// ✅ Complete encapsulation
// ✅ Organized into logical sections
// ✅ No global pollution except one variable
// ✅ Clear separation: utils, dom, game logic, handlers