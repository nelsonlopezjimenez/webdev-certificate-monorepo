// ColorSquare class - represents individual tile
class ColorSquare {
  constructor(element, game) {
    this._element = element;
    this._game = game;
    this._color = null;
    this._setupEventListener();
  }

  // Getters
  get color() {
    return this._color;
  }

  get element() {
    return this._element;
  }

  // Setters
  set color(rgbColor) {
    this._color = rgbColor;
    this._element.style.background = rgbColor;
  }

  // Methods
  _setupEventListener() {
    this._element.addEventListener('click', () => this._handleClick());
  }

  _handleClick() {
    this._game.checkGuess(this);
  }

  hide() {
    this._element.style.display = 'none';
  }

  show() {
    this._element.style.display = 'block';
  }

  fadeOut() {
    this._element.style.background = ColorGame.BACKGROUND_COLOR;
  }

  // Static method for RGB normalization
  static normalizeRGB(rgbString) {
    return rgbString.replace(/\s+/g, '');
  }
}

// ColorGame controller class
class ColorGame {
  static EASY_MODE = 3;
  static HARD_MODE = 6;
  static BACKGROUND_COLOR = '#232323';
  static DEFAULT_H1_COLOR = 'steelblue';

  constructor() {
    this._numSquares = ColorGame.HARD_MODE;
    this._colors = [];
    this._targetColor = null;
    this._squares = [];
    
    this._initDOM();
    this._initSquares();
    this._setupModeButtons();
    this._setupResetButton();
    this.reset();
  }

  // Getters
  get targetColor() {
    return this._targetColor;
  }

  _initDOM() {
    this._colorDisplay = document.getElementById('colorDisplay');
    this._messageDisplay = document.querySelector('#message');
    this._h1 = document.querySelector('h1');
    this._resetButton = document.querySelector('#reset');
    this._modeButtons = document.querySelectorAll('.mode');
  }

  _initSquares() {
    const squareElements = document.querySelectorAll('.square');
    squareElements.forEach(element => {
      this._squares.push(new ColorSquare(element, this));
    });
  }

  _setupModeButtons() {
    this._modeButtons.forEach(button => {
      button.addEventListener('click', () => {
        this._modeButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        this._numSquares = button.textContent === 'Easy' 
          ? ColorGame.EASY_MODE 
          : ColorGame.HARD_MODE;
        this.reset();
      });
    });
  }

  _setupResetButton() {
    this._resetButton.addEventListener('click', () => this.reset());
  }

  reset() {
    this._colors = this._generateRandomColors(this._numSquares);
    this._targetColor = this._pickRandomColor();
    
    this._colorDisplay.textContent = this._targetColor;
    this._resetButton.textContent = 'New Colors';
    this._messageDisplay.textContent = '';
    this._h1.style.background = ColorGame.DEFAULT_H1_COLOR;
    
    this._updateSquares();
  }

  _updateSquares() {
    this._squares.forEach((square, i) => {
      if (i < this._numSquares) {
        square.show();
        square.color = this._colors[i];
      } else {
        square.hide();
      }
    });
  }

  checkGuess(square) {
    const normalizedGuess = ColorSquare.normalizeRGB(square.color);
    const normalizedTarget = ColorSquare.normalizeRGB(this._targetColor);
    
    if (normalizedGuess === normalizedTarget) {
        // this._handleWin() OR this._handleWrongGuess
        /* === SOLUTION START === */

        this._handleWin();
    } else {
        this._handleWrongGuess(square);

        /* === SOLUTION END === */
    }
  }

  _handleWin() {
    this._messageDisplay.textContent = 'Correct!';
    this._resetButton.textContent = 'Play Again?';
    this._changeAllColors(this._targetColor);
    this._h1.style.background = this._targetColor;
  }

  _handleWrongGuess(square) {
    square.fadeOut();
    this._messageDisplay.textContent = 'Try Again';
  }

  _changeAllColors(color) {
    this._squares.forEach(square => {
      square.color = color;
    });
  }

  _pickRandomColor() {
    const randomIndex = Math.floor(Math.random() * this._colors.length);
    return this._colors[randomIndex];
  }

  _generateRandomColors(num) {
    return Array.from({ length: num }, () => ColorGame.randomRGB());
  }

  static randomRGB() {
    const red = Math.floor(Math.random() * 256);
    
    /* === SOLUTION START === */

    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    /* === SOLUTION END === */

    return `rgb(${red}, ${green}, ${blue})`;
  }
}

// Initialize game
const game = new ColorGame();

// ✅ Separation of concerns: ColorSquare handles tile behavior, ColorGame handles game logic
// ✅ Encapsulation with private properties (_property)
// ✅ Getters/setters for controlled access
// ✅ Static constants and methods
// ✅ Each class has single responsibility