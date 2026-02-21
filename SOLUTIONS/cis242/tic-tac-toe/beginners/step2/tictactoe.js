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