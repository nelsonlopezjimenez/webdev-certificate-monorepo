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