
class ColorSquare {
  #element;
  #color;
  #game;

  constructor(element, game) {
    this.#element = element;
    this.#game = game;
    this.#color = null;
    this.#setupEventListener();
  }

  get color() {
    return this.#color;
  }

  set color(rgbColor) {
    this.#color = rgbColor;
    this.#element.style.background = rgbColor;
  }

  #setupEventListener() {
    this.#element.addEventListener('click', () => this.#handleClick());
  }

  #handleClick() {
    this.#game.checkGuess(this);
  }

  hide() {
    this.#element.style.display = 'none';
  }

  show() {
    this.#element.style.display = 'block';
  }

  fadeOut() {
    this.#element.style.background = ColorGame.BACKGROUND_COLOR;
  }

  static normalizeRGB(rgbString) {
    return rgbString.replace(/\s+/g, '');
  }
}

class ColorGame {
  static EASY_MODE = 3;
  static HARD_MODE = 6;
  static BACKGROUND_COLOR = '#232323';
  static DEFAULT_H1_COLOR = 'steelblue';

  #numSquares;
  #colors;
  #targetColor;
  #squares;
  #colorDisplay;
  #messageDisplay;
  #h1;
  #resetButton;
  #modeButtons;

  constructor() {
    this.#numSquares = ColorGame.HARD_MODE;
    this.#colors = [];
    this.#targetColor = null;
    this.#squares = [];
    
    this.#initDOM();
    this.#initSquares();
    this.#setupModeButtons();
    this.#setupResetButton();
    this.reset();
  }

  get targetColor() {
    return this.#targetColor;
  }

  #initDOM() {
    this.#colorDisplay = document.getElementById('colorDisplay');
    this.#messageDisplay = document.querySelector('#message');
    this.#h1 = document.querySelector('h1');
    this.#resetButton = document.querySelector('#reset');
    this.#modeButtons = document.querySelectorAll('.mode');
  }

  #initSquares() {
    const squareElements = document.querySelectorAll('.square');
    squareElements.forEach(element => {
      this.#squares.push(new ColorSquare(element, this));
    });
  }

  #setupModeButtons() {
    this.#modeButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.#modeButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        this.#numSquares = button.textContent === 'Easy' 
          ? ColorGame.EASY_MODE 
          : ColorGame.HARD_MODE;
        this.reset();
      });
    });
  }

  #setupResetButton() {
    this.#resetButton.addEventListener('click', () => this.reset());
  }

  reset() {  // Public method - no #
    this.#colors = this.#generateRandomColors(this.#numSquares);
    this.#targetColor = this.#pickRandomColor();
    
    this.#colorDisplay.textContent = this.#targetColor;
    this.#resetButton.textContent = 'New Colors';
    this.#messageDisplay.textContent = '';
    this.#h1.style.background = ColorGame.DEFAULT_H1_COLOR;
    
    this.#updateSquares();
  }

  checkGuess(square) {  // Public method - no #
    const normalizedGuess = ColorSquare.normalizeRGB(square.color);
    const normalizedTarget = ColorSquare.normalizeRGB(this.#targetColor);
    
    if (normalizedGuess === normalizedTarget) {
      this.#handleWin();
    } else {
      this.#handleWrongGuess(square);
    }
  }

  #handleWin() {
    this.#messageDisplay.textContent = 'Correct!';
    this.#resetButton.textContent = 'Play Again?';
    this.#changeAllColors(this.#targetColor);
    this.#h1.style.background = this.#targetColor;
  }

  #handleWrongGuess(square) {
    square.fadeOut();
    this.#messageDisplay.textContent = 'Try Again';
  }

  #changeAllColors(color) {
    this.#squares.forEach(square => {
      square.color = color;
    });
  }

  #pickRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.#colors.length);
    return this.#colors[randomIndex];
  }

  #generateRandomColors(num) {
    return Array.from({ length: num }, () => ColorGame.randomRGB());
  }

  #updateSquares() {
    this.#squares.forEach((square, i) => {
      if (i < this.#numSquares) {
        square.show();
        square.color = this.#colors[i];
      } else {
        square.hide();
      }
    });
  }

  static randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

const game = new ColorGame();

const squareTmp = new ColorSquare(element);
// console.log(squareTmp.#color);  // ✅ SyntaxError! Actually private
// console.log(squareTmp.color);   // ✅ Works via getter

