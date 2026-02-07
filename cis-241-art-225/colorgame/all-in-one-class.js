class ColorGame {
  // Static constants
  static EASY_MODE = 3;
  static HARD_MODE = 6;
  static BACKGROUND_COLOR = '#232323';
  static DEFAULT_H1_COLOR = 'steelblue';
  static WIN_MESSAGE = 'Correct!';
  static LOSE_MESSAGE = 'Try Again';

  constructor() {
    this._numSquares = ColorGame.HARD_MODE;
    this._colors = [];
    this._targetColor = null;
    
    this._cacheDOM();
    this._bindEvents();
    this.reset();
  }

  // Getters
  get targetColor() {
    return this._targetColor;
  }

  get isEasyMode() {
    return this._numSquares === ColorGame.EASY_MODE;
  }

  get isHardMode() {
    return this._numSquares === ColorGame.HARD_MODE;
  }

  // Cache DOM elements
  _cacheDOM() {
    this._squares = document.querySelectorAll('.square');
    this._colorDisplay = document.getElementById('colorDisplay');
    this._messageDisplay = document.querySelector('#message');
    this._h1 = document.querySelector('h1');
    this._resetButton = document.querySelector('#reset');
    this._modeButtons = document.querySelectorAll('.mode');
  }

  // Bind all event listeners
  _bindEvents() {
    this._squares.forEach((square, index) => {
      square.addEventListener('click', () => this._handleSquareClick(square, index));
    });

    this._modeButtons.forEach(button => {
      button.addEventListener('click', () => this._handleModeChange(button));
    });

    this._resetButton.addEventListener('click', () => this.reset());
  }

  // Event handlers
  _handleSquareClick(square, index) {
    // Only respond if square is visible
    if (index >= this._numSquares) return;

    const clickedColor = this._normalizeRGB(square.style.background);
    const normalizedTarget = this._normalizeRGB(this._targetColor);

    if (clickedColor === normalizedTarget) {
      this._handleCorrectGuess();
    } else {
      this._handleWrongGuess(square);
    }
  }

  _handleModeChange(clickedButton) {
    this._modeButtons.forEach(btn => btn.classList.remove('selected'));
    clickedButton.classList.add('selected');
    
    this._numSquares = clickedButton.textContent === 'Easy' 
      ? ColorGame.EASY_MODE 
      : ColorGame.HARD_MODE;
    
    this.reset();
  }

  _handleCorrectGuess() {
    this._setMessage(ColorGame.WIN_MESSAGE);
    this._resetButton.textContent = 'Play Again?';
    this._changeAllSquaresTo(this._targetColor);
    this._h1.style.background = this._targetColor;
  }

  _handleWrongGuess(square) {
    square.style.background = ColorGame.BACKGROUND_COLOR;
    this._setMessage(ColorGame.LOSE_MESSAGE);
  }

  // Public method to reset game
  reset() {
    this._generateNewColors();
    this._pickNewTarget();
    this._updateDisplay();
    this._updateSquares();
    this._resetHeader();
  }

  // Private game logic methods
  _generateNewColors() {
    this._colors = Array.from(
      { length: this._numSquares }, 
      () => ColorGame.randomRGB()
    );
  }

  _pickNewTarget() {
    const randomIndex = Math.floor(Math.random() * this._colors.length);
    this._targetColor = this._colors[randomIndex];
  }

  _updateDisplay() {
    this._colorDisplay.textContent = this._targetColor;
    this._resetButton.textContent = 'New Colors';
    this._setMessage('');
  }

  _updateSquares() {
    this._squares.forEach((square, i) => {
      if (i < this._numSquares) {
        this._showSquare(square, this._colors[i]);
      } else {
        this._hideSquare(square);
      }
    });
  }

  _resetHeader() {
    this._h1.style.background = ColorGame.DEFAULT_H1_COLOR;
  }

  _showSquare(square, color) {
    square.style.display = 'block';
    square.style.background = color;
  }

  _hideSquare(square) {
    square.style.display = 'none';
  }

  _changeAllSquaresTo(color) {
    this._squares.forEach(square => {
      square.style.background = color;
    });
  }

  _setMessage(text) {
    this._messageDisplay.textContent = text;
  }

  _normalizeRGB(rgbString) {
    return rgbString.replace(/\s+/g, '');
  }

  // Static utility methods
  static randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  static randomComponent() {
    return Math.floor(Math.random() * 256);
  }
}

// Initialize game
const game = new ColorGame();

// ✅ Single class managing all functionality
// ✅ Clear method organization (public vs private with _ prefix)
// ✅ Static constants and utility methods
// ✅ Getters for state queries (isEasyMode, isHardMode)
// ✅ Centralized event binding
// ✅ Descriptive method names showing intent