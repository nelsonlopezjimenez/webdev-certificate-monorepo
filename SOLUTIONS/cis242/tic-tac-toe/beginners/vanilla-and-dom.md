# Tic-Tac-Toe for Teaching DOM Interactions

I'll create a progressive series starting with pure DOM manipulation, then build up complexity. Perfect for teaching!

## Setup - HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-Tac-Toe - DOM Tutorial</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 1rem;
        }
        
        #status {
            text-align: center;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            min-height: 30px;
            font-weight: bold;
            color: #667eea;
        }
        
        #board {
            display: grid;
            grid-template-columns: repeat(3, 120px);
            grid-template-rows: repeat(3, 120px);
            gap: 10px;
            margin-bottom: 1rem;
        }
        
        .cell {
            background: #f0f0f0;
            border: 3px solid #ddd;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .cell:hover:not(.filled) {
            background: #e0e0e0;
            transform: scale(1.05);
        }
        
        .cell.filled {
            cursor: not-allowed;
        }
        
        .cell img {
            width: 80%;
            height: 80%;
            object-fit: contain;
        }
        
        .cell.winner {
            background: #ffd700;
            animation: winner-pulse 0.5s ease-in-out infinite alternate;
        }
        
        @keyframes winner-pulse {
            from { transform: scale(1); }
            to { transform: scale(1.1); }
        }
        
        button {
            width: 100%;
            padding: 1rem;
            font-size: 1.1rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        button:hover {
            background: #5568d3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tic-Tac-Toe</h1>
        <div id="status">Your turn! Click a square</div>
        <div id="board">
            <!-- We'll create cells with JavaScript -->
        </div>
        <button id="resetButton">Reset Game</button>
    </div>
    
    <script src="tictactoe.js"></script>
</body>
</html>
```

---

## Step 1: Basic DOM Interaction - Just Place X's

**Focus: Understanding DOM selection, event listeners, and element creation**

```javascript
/**
 * TIC-TAC-TOE - Step 1: Basic DOM Interaction
 * 
 * Learning Objectives:
 * 1. Select DOM elements with getElementById, querySelector
 * 2. Create elements with createElement
 * 3. Add event listeners with addEventListener
 * 4. Modify element content and attributes
 * 5. Add/remove CSS classes with classList
 */

// ============================================
// STEP 1: SELECT DOM ELEMENTS
// ============================================

/**
 * DOM Selection Methods:
 * - document.getElementById('id') - Select ONE element by ID
 * - document.querySelector('.class') - Select FIRST matching element
 * - document.querySelectorAll('.class') - Select ALL matching elements (returns NodeList)
 */

// Get the board container
// This is where we'll add our 9 cells
const board = document.getElementById('board');

// Get the status message element
const statusDisplay = document.getElementById('status');

// Get the reset button
const resetButton = document.getElementById('resetButton');

console.log('Board element:', board); // See what we selected


// ============================================
// STEP 2: CREATE THE GAME BOARD
// ============================================

/**
 * Creating Elements:
 * - document.createElement('tagName') - Creates a new element
 * - element.appendChild(child) - Adds child to parent
 * - element.className = 'class' - Set CSS class
 * - element.dataset.index = value - Set data attribute (data-index)
 */

function createBoard() {
    // Clear any existing content
    board.innerHTML = '';
    
    // Create 9 cells (for 3x3 grid)
    for (let i = 0; i < 9; i++) {
        // Create a new div element
        const cell = document.createElement('div');
        
        // Add CSS class for styling
        cell.className = 'cell';
        
        // Store the index as a data attribute
        // This helps us know which cell was clicked
        cell.dataset.index = i;
        
        // Add click event listener
        // When cell is clicked, call handleCellClick function
        cell.addEventListener('click', handleCellClick);
        
        // Add the cell to the board
        board.appendChild(cell);
        
        console.log(`Created cell ${i}`); // Track creation
    }
}


// ============================================
// STEP 3: HANDLE CLICKS - PLACE AN X
// ============================================

/**
 * Event Handling:
 * - addEventListener('event', function) - Attach event listener
 * - event.target - The element that was clicked
 * - event.target.dataset.index - Access data attribute
 * - classList.add('class') - Add CSS class
 * - classList.contains('class') - Check if class exists
 */

function handleCellClick(event) {
    // 'event.target' is the element that was clicked
    const clickedCell = event.target;
    
    console.log('Cell clicked:', clickedCell.dataset.index);
    
    // Check if cell is already filled
    // classList.contains() checks if element has a class
    if (clickedCell.classList.contains('filled')) {
        console.log('Cell already filled!');
        return; // Exit function early
    }
    
    // Place an X
    placeX(clickedCell);
}

/**
 * Adding Images to DOM:
 * - createElement('img') - Create image element
 * - img.src = 'path' - Set image source
 * - img.alt = 'text' - Set alternative text
 * - appendChild(img) - Add image to cell
 */

function placeX(cell) {
    // Create an img element
    const xImage = document.createElement('img');
    
    // Set the image source
    // Using SVG data URL for X (no external file needed)
    xImage.src = 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#667eea" stroke-width="8" stroke-linecap="round"/>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#667eea" stroke-width="8" stroke-linecap="round"/>
        </svg>
    `);
    
    // Set alt text for accessibility
    xImage.alt = 'X';
    
    // Add image to cell
    cell.appendChild(xImage);
    
    // Mark cell as filled
    // classList.add() adds a CSS class
    cell.classList.add('filled');
    
    // Update status message
    // textContent sets the text inside an element
    statusDisplay.textContent = 'X placed!';
    
    console.log('X placed in cell', cell.dataset.index);
}


// ============================================
// STEP 4: RESET FUNCTIONALITY
// ============================================

/**
 * Resetting the board:
 * - querySelectorAll() - Select all matching elements
 * - forEach() - Loop through NodeList
 * - removeChild() - Remove child element
 * - classList.remove() - Remove CSS class
 */

function resetGame() {
    console.log('Resetting game...');
    
    // Select all cells
    // querySelectorAll returns a NodeList of ALL matching elements
    const allCells = document.querySelectorAll('.cell');
    
    // Loop through each cell
    allCells.forEach(cell => {
        // Remove all child elements (the X or O images)
        // innerHTML = '' clears all content
        cell.innerHTML = '';
        
        // Remove 'filled' class
        cell.classList.remove('filled');
    });
    
    // Reset status message
    statusDisplay.textContent = 'Your turn! Click a square';
}

// Add click listener to reset button
resetButton.addEventListener('click', resetGame);


// ============================================
// INITIALIZE THE GAME
// ============================================

// Create the board when page loads
createBoard();

/**
 * DOM INTERACTION SUMMARY:
 * 
 * 1. SELECTING ELEMENTS:
 *    getElementById('id') - Single element by ID
 *    querySelector('.class') - First matching element
 *    querySelectorAll('.class') - All matching elements
 * 
 * 2. CREATING ELEMENTS:
 *    createElement('tag') - Create new element
 *    appendChild(element) - Add to parent
 * 
 * 3. MODIFYING ELEMENTS:
 *    element.textContent = 'text' - Set text
 *    element.innerHTML = 'html' - Set HTML
 *    element.src = 'url' - Set attribute
 *    element.dataset.name = 'value' - Set data attribute
 * 
 * 4. CSS CLASSES:
 *    element.classList.add('class') - Add class
 *    element.classList.remove('class') - Remove class
 *    element.classList.contains('class') - Check class
 *    element.classList.toggle('class') - Toggle class
 * 
 * 5. EVENTS:
 *    element.addEventListener('click', function) - Add listener
 *    event.target - Element that triggered event
 */
```

---

## Step 2: Add Computer (O) Move

**Focus: Random selection, setTimeout for delays, more DOM manipulation**

```javascript
/**
 * TIC-TAC-TOE - Step 2: Add Computer Player
 * 
 * New Concepts:
 * 1. Array manipulation and filtering
 * 2. Random selection
 * 3. setTimeout for delays
 * 4. Getting elements by class
 */

const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

// Track whose turn it is
let isPlayerTurn = true;

function createBoard() {
    board.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    
    // Don't allow moves if it's not player's turn
    if (!isPlayerTurn) {
        statusDisplay.textContent = "Wait for computer's turn!";
        return;
    }
    
    // Check if cell is already filled
    if (clickedCell.classList.contains('filled')) {
        return;
    }
    
    // Place player's X
    placeX(clickedCell);
    
    // Switch to computer's turn
    isPlayerTurn = false;
    statusDisplay.textContent = "Computer's turn...";
    
    // Computer makes move after a short delay
    // setTimeout(function, milliseconds) - Executes function after delay
    setTimeout(() => {
        computerMove();
        isPlayerTurn = true;
        statusDisplay.textContent = 'Your turn! Click a square';
    }, 500); // Wait 500ms (half a second)
}

function placeX(cell) {
    const xImage = document.createElement('img');
    xImage.src = 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#667eea" stroke-width="8" stroke-linecap="round"/>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#667eea" stroke-width="8" stroke-linecap="round"/>
        </svg>
    `);
    xImage.alt = 'X';
    cell.appendChild(xImage);
    cell.classList.add('filled');
}

/**
 * Place O (Computer's move)
 * Shows same DOM manipulation as placeX, but different image
 */
function placeO(cell) {
    const oImage = document.createElement('img');
    oImage.src = 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#764ba2" stroke-width="8"/>
        </svg>
    `);
    oImage.alt = 'O';
    cell.appendChild(oImage);
    cell.classList.add('filled');
}

/**
 * Computer makes random move
 * 
 * New Concepts:
 * - Converting NodeList to Array
 * - Filtering arrays
 * - Random selection from array
 */
function computerMove() {
    // Get all cells
    const allCells = document.querySelectorAll('.cell');
    
    // Convert NodeList to Array
    // Array.from() converts array-like objects to real arrays
    const cellsArray = Array.from(allCells);
    
    // Filter to get only empty cells
    // filter() creates new array with elements that pass test
    const emptyCells = cellsArray.filter(cell => {
        // Check if cell does NOT have 'filled' class
        return !cell.classList.contains('filled');
    });
    
    console.log('Empty cells:', emptyCells.length);
    
    // If no empty cells, game is over
    if (emptyCells.length === 0) {
        statusDisplay.textContent = "It's a draw!";
        return;
    }
    
    // Pick random empty cell
    // Math.random() returns number between 0 and 1
    // Math.floor() rounds down to integer
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    
    console.log('Computer chose cell:', randomCell.dataset.index);
    
    // Place O
    placeO(randomCell);
}

function resetGame() {
    const allCells = document.querySelectorAll('.cell');
    
    allCells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('filled');
    });
    
    isPlayerTurn = true;
    statusDisplay.textContent = 'Your turn! Click a square';
}

resetButton.addEventListener('click', resetGame);
createBoard();

/**
 * NEW CONCEPTS DEMONSTRATED:
 * 
 * 1. ARRAYS AND NODELISTS:
 *    querySelectorAll() returns NodeList (not Array)
 *    Array.from(nodeList) converts to Array
 *    array.filter(callback) creates filtered array
 * 
 * 2. RANDOM SELECTION:
 *    Math.random() - Random number 0 to 1
 *    Math.floor() - Round down to integer
 *    array[randomIndex] - Get random element
 * 
 * 3. TIMING:
 *    setTimeout(function, ms) - Execute after delay
 *    Used to make computer move feel more natural
 * 
 * 4. STATE MANAGEMENT:
 *    isPlayerTurn variable tracks game state
 *    Prevents moves during computer's turn
 */
```

---

## Step 3: Add Winner Detection

**Focus: Array methods, pattern matching, modifying multiple elements**

```javascript
/**
 * TIC-TAC-TOE - Step 3: Winner Detection
 * 
 * New Concepts:
 * 1. Working with arrays of indices
 * 2. Checking patterns
 * 3. Accessing elements by data attributes
 * 4. Highlighting multiple elements
 * 5. Disabling user interaction
 */

const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let isPlayerTurn = true;
let gameActive = true; // Track if game is still playable

/**
 * Winning patterns - all ways to win
 * Each inner array represents indices that form a line
 * 
 * Board layout:
 * 0 | 1 | 2
 * ---------
 * 3 | 4 | 5
 * ---------
 * 6 | 7 | 8
 */
const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

function createBoard() {
    board.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    
    // Don't allow moves if game is over or not player's turn
    if (!gameActive || !isPlayerTurn) {
        return;
    }
    
    if (clickedCell.classList.contains('filled')) {
        return;
    }
    
    placeX(clickedCell);
    
    // Check for winner after player's move
    if (checkWinner('X')) {
        return; // Game over
    }
    
    // Check for draw
    if (checkDraw()) {
        return; // Game over
    }
    
    // Computer's turn
    isPlayerTurn = false;
    statusDisplay.textContent = "Computer's turn...";
    
    setTimeout(() => {
        computerMove();
        
        // Check for winner after computer's move
        if (checkWinner('O')) {
            return; // Game over
        }
        
        // Check for draw
        if (checkDraw()) {
            return; // Game over
        }
        
        isPlayerTurn = true;
        statusDisplay.textContent = 'Your turn!';
    }, 500);
}

function placeX(cell) {
    const xImage = document.createElement('img');
    xImage.src = 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#667eea" stroke-width="8" stroke-linecap="round"/>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#667eea" stroke-width="8" stroke-linecap="round"/>
        </svg>
    `);
    xImage.alt = 'X';
    cell.appendChild(xImage);
    cell.classList.add('filled');
    
    // Store what symbol is in this cell
    // We'll use this to check for winners
    cell.dataset.symbol = 'X';
}

function placeO(cell) {
    const oImage = document.createElement('img');
    oImage.src = 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#764ba2" stroke-width="8"/>
        </svg>
    `);
    oImage.alt = 'O';
    cell.appendChild(oImage);
    cell.classList.add('filled');
    cell.dataset.symbol = 'O';
}

function computerMove() {
    const allCells = document.querySelectorAll('.cell');
    const cellsArray = Array.from(allCells);
    const emptyCells = cellsArray.filter(cell => !cell.classList.contains('filled'));
    
    if (emptyCells.length === 0) {
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    
    placeO(randomCell);
}

/**
 * Check if there's a winner
 * 
 * DOM Concepts:
 * - querySelector with data attribute selector
 * - Accessing multiple elements by index
 * - Adding classes to multiple elements
 * 
 * @param {string} symbol - 'X' or 'O'
 * @returns {boolean} - true if winner found
 */
function checkWinner(symbol) {
    // Loop through each winning pattern
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern; // Destructure pattern array
        
        // Select cells by their data-index attribute
        // querySelector with [attribute=value] syntax
        const cell1 = document.querySelector(`[data-index="${a}"]`);
        const cell2 = document.querySelector(`[data-index="${b}"]`);
        const cell3 = document.querySelector(`[data-index="${c}"]`);
        
        // Check if all three cells have the same symbol
        // dataset.symbol accesses data-symbol attribute
        if (cell1.dataset.symbol === symbol &&
            cell2.dataset.symbol === symbol &&
            cell3.dataset.symbol === symbol) {
            
            console.log(`${symbol} wins with pattern:`, pattern);
            
            // Highlight winning cells
            highlightWinningCells([cell1, cell2, cell3]);
            
            // Update status
            statusDisplay.textContent = `${symbol} wins! 🎉`;
            
            // End game
            gameActive = false;
            
            return true;
        }
    }
    
    return false; // No winner yet
}

/**
 * Highlight winning cells
 * 
 * DOM Concepts:
 * - Looping through array of elements
 * - Adding CSS class to multiple elements
 * 
 * @param {Array} cells - Array of cell elements
 */
function highlightWinningCells(cells) {
    // forEach loops through array
    cells.forEach(cell => {
        // Add 'winner' class for animation
        cell.classList.add('winner');
    });
}

/**
 * Check if board is full (draw)
 * 
 * @returns {boolean} - true if draw
 */
function checkDraw() {
    const allCells = document.querySelectorAll('.cell');
    const cellsArray = Array.from(allCells);
    
    // every() returns true if ALL elements pass the test
    const isFull = cellsArray.every(cell => cell.classList.contains('filled'));
    
    if (isFull && gameActive) {
        statusDisplay.textContent = "It's a draw! 🤝";
        gameActive = false;
        return true;
    }
    
    return false;
}

function resetGame() {
    const allCells = document.querySelectorAll('.cell');
    
    allCells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('filled', 'winner');
        
        // Remove data-symbol attribute
        // delete removes property
        delete cell.dataset.symbol;
    });
    
    isPlayerTurn = true;
    gameActive = true;
    statusDisplay.textContent = 'Your turn! Click a square';
}

resetButton.addEventListener('click', resetGame);
createBoard();

/**
 * ADVANCED DOM CONCEPTS DEMONSTRATED:
 * 
 * 1. DATA ATTRIBUTES:
 *    element.dataset.name = 'value' - Set data-name
 *    element.dataset.name - Read data-name
 *    delete element.dataset.name - Remove data-name
 *    querySelector('[data-name="value"]') - Select by data attribute
 * 
 * 2. ATTRIBUTE SELECTORS:
 *    [data-index="0"] - Select element with specific data-index
 *    Very useful for selecting specific elements
 * 
 * 3. ARRAY METHODS:
 *    array.every(callback) - All elements must pass test
 *    array.some(callback) - At least one element must pass test
 *    array.forEach(callback) - Execute function for each element
 * 
 * 4. DESTRUCTURING:
 *    const [a, b, c] = array - Extract array values
 *    Makes code cleaner and more readable
 * 
 * 5. MULTIPLE CLASS MANAGEMENT:
 *    classList.add('class1', 'class2') - Add multiple classes
 *    classList.remove('class1', 'class2') - Remove multiple classes
 */
```

---

## Teaching Progression Summary

### Lesson 1: Basic DOM (Step 1)
- **Focus**: Selecting elements, creating elements, event listeners
- **Activity**: Students click to place X's
- **Key Methods**: `getElementById`, `createElement`, `addEventListener`, `appendChild`

### Lesson 2: Arrays & Timing (Step 2)
- **Focus**: Working with NodeLists, arrays, setTimeout
- **Activity**: Computer randomly places O's
- **Key Methods**: `querySelectorAll`, `Array.from`, `filter`, `setTimeout`

### Lesson 3: Logic & Patterns (Step 3)
- **Focus**: Data attributes, pattern matching, state management
- **Activity**: Detect winners and draws
- **Key Methods**: `dataset`, attribute selectors, `every`, `forEach`

### Key DOM Concepts Covered

1. **Selection**: `getElementById`, `querySelector`, `querySelectorAll`
2. **Creation**: `createElement`, `appendChild`
3. **Modification**: `textContent`, `innerHTML`, `src`, `alt`
4. **Classes**: `classList.add/remove/contains/toggle`
5. **Data Attributes**: `dataset.name`, `[data-name="value"]`
6. **Events**: `addEventListener`, `event.target`
7. **Arrays**: `Array.from`, `filter`, `forEach`, `every`
8. **Timing**: `setTimeout`

Each step builds on the previous, making it perfect for teaching progressive complexity!