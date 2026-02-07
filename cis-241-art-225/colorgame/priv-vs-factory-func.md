## The Underscore Convention - Great Question!

### What It Means

The underscore (`_propertyName`) is a **naming convention** to indicate "private" fields:

```javascript
class ColorSquare {
  constructor(element) {
    this._element = element;  // "private" by convention
    this._color = null;       // "private" by convention
  }
}
```

**Critical Point:** It's **NOT actually private** - just a social contract saying "don't access this from outside the class."

```javascript
const square = new ColorSquare(element);
console.log(square._element);  // ❌ Works! But you "shouldn't" do this
```

### Why It Exists

1. **Borrowed from Python** - where single underscore means "internal use"
2. **Pre-ES2022** - before JavaScript had real private fields
3. **Developer communication** - signals intent to other programmers
4. **Legacy pattern** - you'll see it in older codebases

### Modern Alternative: True Private Fields (`#`)

JavaScript now has **actual private fields** using `#`:

```javascript
class ColorSquare {
  // True private fields (ES2022+)
  #element;
  #color;

  constructor(element) {
    this.#element = element;
    this.#color = null;
  }

  get color() {
    return this.#color;  // Can access inside class
  }
}

const square = new ColorSquare(element);
console.log(square.#color);  // ✅ SyntaxError! Actually private
console.log(square.color);   // ✅ Works via getter
```

### Version 2 Rewritten with True Private Fields

```javascript
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
```

## Comparison: `_` vs `#`

| Feature | `_property` | `#property` |
|---------|-------------|-------------|
| **Privacy** | ❌ Fake (convention only) | ✅ Real (enforced) |
| **Access from outside** | ✅ Possible (but shouldn't) | ❌ SyntaxError |
| **Browser support** | ✅ All browsers | ✅ Modern (2022+) |
| **Readability** | ✅ Familiar | ⚠️ New syntax |
| **Tool support** | ⚠️ Linters warn | ✅ TypeScript/IDE support |
| **Use in 2025** | Legacy code | **Modern standard** |

## What to Teach Students?

### For Reading Code:
- **Explain both** - they'll encounter `_` in legacy codebases
- `_property` = "please don't touch" (not enforced)
- `#property` = "you literally can't touch" (enforced)

### For Writing New Code:
**Recommend `#` (true private fields):**

```javascript
// Modern 2025 approach
class User {
  #password;  // Actually private
  
  constructor(password) {
    this.#password = this.#hash(password);
  }
  
  #hash(str) {  // Private method
    // hashing logic
  }
  
  verify(attempt) {  // Public method
    return this.#hash(attempt) === this.#password;
  }
}
```

### Teaching Sequence:
1. ✅ Explain `_` convention (for reading legacy code)
2. ✅ Show it's not enforced
3. ✅ Introduce `#` as modern replacement
4. ✅ Use `#` in all new examples

### But honestly...
For **modern web development**, factory functions avoid this whole issue:

```javascript
// No privacy confusion - closures just work
function createUser(password) {
  let hashedPassword = hash(password);  // Truly private
  
  return {
    verify(attempt) {
      return hash(attempt) === hashedPassword;
    }
  };
}
```

**Bottom line:** I used `_` in Version 2 out of habit from older JS patterns. For teaching in 2025, use `#` if teaching classes, or skip the confusion and use factory functions/closures.