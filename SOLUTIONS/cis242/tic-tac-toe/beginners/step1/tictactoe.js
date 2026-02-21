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