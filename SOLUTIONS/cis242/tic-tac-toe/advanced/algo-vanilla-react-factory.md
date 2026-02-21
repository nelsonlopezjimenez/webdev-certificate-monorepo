# Tic-Tac-Toe Game - Progressive Implementation

## Game Description

**Tic-Tac-Toe** is a two-player game played on a 3x3 grid:
- Players alternate turns placing their symbol (X or O)
- First player to get 3 symbols in a row (horizontal, vertical, or diagonal) wins
- If all 9 squares are filled with no winner, it's a draw

## Algorithm

```
1. Initialize game state:
   - 9 empty squares (represented as array [null, null, null, ...])
   - Current player (X starts)
   - Game status (playing, won, draw)

2. On square click:
   - If square is filled OR game is over → do nothing
   - Place current player's symbol in clicked square
   - Check for winner:
     * Check all rows for three matching symbols
     * Check all columns for three matching symbols
     * Check both diagonals for three matching symbols
   - If winner found → update status to won
   - Else if all squares filled → update status to draw
   - Else → switch to other player

3. On reset:
   - Clear all squares
   - Reset to player X
   - Reset status to playing
```

## Pseudocode

```
FUNCTION checkWinner(squares):
    winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],  // rows
        [0,3,6], [1,4,7], [2,5,8],  // columns
        [0,4,8], [2,4,6]             // diagonals
    ]
    
    FOR each pattern in winPatterns:
        [a, b, c] = pattern
        IF squares[a] AND squares[a] == squares[b] == squares[c]:
            RETURN squares[a]  // Return 'X' or 'O'
    
    RETURN null

FUNCTION handleSquareClick(index):
    IF squares[index] is filled OR game is over:
        RETURN
    
    newSquares = copy of squares
    newSquares[index] = currentPlayer
    
    winner = checkWinner(newSquares)
    
    IF winner exists:
        SET status to winner + " wins!"
    ELSE IF all squares filled:
        SET status to "Draw!"
    ELSE:
        SWITCH currentPlayer from X to O or O to X
    
    UPDATE squares to newSquares
```

---

# Priority 1: React Hooks Pattern

## HTML (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-Tac-Toe - React</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        #root {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        .game-title {
            text-align: center;
            color: #333;
            margin-bottom: 1rem;
        }
        
        .game-info {
            text-align: center;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            min-height: 30px;
            font-weight: bold;
            color: #667eea;
        }
        
        .board {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(3, 100px);
            gap: 10px;
            margin-bottom: 1rem;
        }
        
        .square {
            background: #f0f0f0;
            border: none;
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s;
        }
        
        .square:hover:not(:disabled) {
            background: #e0e0e0;
            transform: scale(1.05);
        }
        
        .square:disabled {
            cursor: not-allowed;
        }
        
        .square.X {
            color: #667eea;
        }
        
        .square.O {
            color: #764ba2;
        }
        
        .reset-button {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .reset-button:hover {
            background: #5568d3;
        }
        
        .winner {
            animation: pulse 0.5s ease-in-out;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <!-- React and ReactDOM from CDN -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Babel for JSX transformation -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <script type="text/babel" src="tictactoe-react.js"></script>
</body>
</html>
```

## JavaScript with React Hooks (tictactoe-react.js)

```javascript
/**
 * REACT HOOKS VERSION - Tic-Tac-Toe
 * 
 * Key Concepts Demonstrated:
 * 1. useState - Managing component state
 * 2. Component Scope - Variables defined in component re-create on each render
 * 3. Immutability - Never mutate state directly, always create new arrays/objects
 * 4. Component Lifecycle - useEffect for side effects (bonus: we'll add async example)
 */

const { useState, useEffect } = React;

/**
 * Pure utility function - lives outside component
 * Scope: Global scope - created once when file loads
 * Lifecycle: Exists for entire application lifetime
 * 
 * @param {Array} squares - Current board state
 * @returns {string|null} - Winner ('X' or 'O') or null
 */
function calculateWinner(squares) {
    // All possible winning combinations (rows, columns, diagonals)
    const winningPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];
    
    // Check each pattern to see if there's a winner
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        
        // If first square is filled AND all three squares match
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // Return 'X' or 'O'
        }
    }
    
    return null; // No winner yet
}

/**
 * Square Component - Represents a single square on the board
 * 
 * Props lifecycle: Props are passed from parent on each render
 * Function scope: Component function runs on every render
 */
function Square({ value, onClick, isWinning }) {
    // This function is recreated on every render
    // Scope: Function scope - only exists during this component render
    
    return (
        <button 
            className={`square ${value || ''} ${isWinning ? 'winner' : ''}`}
            onClick={onClick}
            disabled={value !== null} // Disable if already filled
        >
            {value}
        </button>
    );
}

/**
 * Board Component - Renders the 3x3 grid
 */
function Board({ squares, onSquareClick, winningSquares }) {
    /**
     * Renders a single square
     * Scope: Function scope - created fresh on each Board render
     * Closure: This function "closes over" squares, onSquareClick, winningSquares
     *          from the parent scope, meaning it has access to those variables
     */
    const renderSquare = (index) => {
        // Check if this square is part of the winning combination
        const isWinning = winningSquares && winningSquares.includes(index);
        
        return (
            <Square
                key={index}
                value={squares[index]}
                onClick={() => onSquareClick(index)}
                isWinning={isWinning}
            />
        );
    };
    
    return (
        <div className="board">
            {/* Create array of 9 elements and map to squares */}
            {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
        </div>
    );
}

/**
 * Main Game Component
 * 
 * State Management with useState:
 * - State persists between renders
 * - Updating state triggers re-render
 * - State updates are asynchronous
 */
function TicTacToe() {
    /**
     * STATE: squares
     * Scope: Component scope - accessible anywhere in this component
     * Lifecycle: 
     *   - Created on component mount with initial value (9 nulls)
     *   - Persists between renders (React remembers it)
     *   - Destroyed when component unmounts
     * 
     * Immutability Rule: NEVER do squares[0] = 'X'
     * Always create new array: setSquares([...newSquares])
     */
    const [squares, setSquares] = useState(Array(9).fill(null));
    
    /**
     * STATE: currentPlayer
     * Lifecycle: Same as squares - persists between renders
     */
    const [currentPlayer, setCurrentPlayer] = useState('X');
    
    /**
     * STATE: gameStatus
     * Stores current game state: 'playing', 'won', or 'draw'
     */
    const [gameStatus, setGameStatus] = useState('playing');
    
    /**
     * STATE: winningSquares
     * Stores indices of winning squares for highlighting
     */
    const [winningSquares, setWinningSquares] = useState(null);
    
    /**
     * Computed value - NOT state
     * Scope: Function scope - recalculated on every render
     * Lifecycle: Created fresh each render, no persistence needed
     * 
     * This demonstrates the difference between state and derived values:
     * - winner is DERIVED from squares (recalculated each render)
     * - squares is STATE (persists between renders)
     */
    const winner = calculateWinner(squares);
    
    /**
     * useEffect - Side Effects Hook
     * Demonstrates async operations and lifecycle
     * 
     * Lifecycle:
     * 1. Component renders
     * 2. React commits changes to DOM
     * 3. useEffect callback runs
     * 
     * This effect runs after EVERY render where 'squares' changes
     */
    useEffect(() => {
        /**
         * Example of async operation in React
         * Scope: This async function is created in useEffect scope
         * Closure: It closes over 'winner', 'squares', and state setters
         */
        async function checkGameStatus() {
            // Simulate async operation (e.g., API call to save game state)
            // In real app, might save to database or check with server
            
            if (winner) {
                // Winner found
                setGameStatus('won');
                // Find and highlight winning squares
                findWinningSquares();
            } else if (squares.every(square => square !== null)) {
                // All squares filled, no winner = draw
                setGameStatus('draw');
            } else {
                // Game still in progress
                setGameStatus('playing');
            }
        }
        
        // Call the async function
        checkGameStatus();
        
        // Dependency array: Effect re-runs when these values change
    }, [squares, winner]);
    
    /**
     * Helper function to find winning square indices
     * Scope: Function scope - recreated on each render
     * Closure: Closes over 'squares' and 'setWinningSquares'
     */
    function findWinningSquares() {
        const patterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let pattern of patterns) {
            const [a, b, c] = pattern;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setWinningSquares(pattern);
                return;
            }
        }
    }
    
    /**
     * Event handler - handles square clicks
     * Scope: Function scope - recreated on each render
     * Closure: Closes over all state variables and setters
     * 
     * Important: This is a NEW function on every render
     * React optimizes to prevent unnecessary child re-renders
     */
    const handleSquareClick = (index) => {
        // Guard clauses - exit early if move is invalid
        if (squares[index] !== null) return; // Square already filled
        if (gameStatus !== 'playing') return; // Game is over
        
        /**
         * IMMUTABILITY DEMONSTRATION
         * 
         * Wrong way (mutates original array):
         * squares[index] = currentPlayer; ❌
         * setSquares(squares); ❌
         * 
         * Right way (creates new array):
         */
        const newSquares = [...squares]; // Spread operator creates new array
        newSquares[index] = currentPlayer;
        
        /**
         * State update
         * - Asynchronous: React batches updates for performance
         * - Triggers re-render: Component function runs again with new state
         * - Immutable: Original 'squares' unchanged, new array created
         */
        setSquares(newSquares);
        
        /**
         * Switch player
         * Ternary operator: condition ? valueIfTrue : valueIfFalse
         */
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };
    
    /**
     * Reset handler
     * Scope: Function scope
     * Closure: Closes over all state setters
     */
    const handleReset = () => {
        // Reset all state to initial values
        setSquares(Array(9).fill(null));
        setCurrentPlayer('X');
        setGameStatus('playing');
        setWinningSquares(null);
    };
    
    /**
     * Get display message based on game status
     * Scope: Function scope - recalculated each render
     */
    const getStatusMessage = () => {
        if (gameStatus === 'won') {
            return `Winner: ${winner}! 🎉`;
        } else if (gameStatus === 'draw') {
            return "It's a Draw! 🤝";
        } else {
            return `Next Player: ${currentPlayer}`;
        }
    };
    
    /**
     * JSX Return - Component's UI
     * This is what React renders to the DOM
     */
    return (
        <div className="game">
            <h1 className="game-title">Tic-Tac-Toe</h1>
            <div className="game-info">{getStatusMessage()}</div>
            <Board 
                squares={squares}
                onSquareClick={handleSquareClick}
                winningSquares={winningSquares}
            />
            <button className="reset-button" onClick={handleReset}>
                New Game
            </button>
        </div>
    );
}

/**
 * Render the app
 * This code runs once when the script loads
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TicTacToe />);

/**
 * KEY CONCEPTS SUMMARY:
 * 
 * 1. SCOPE:
 *    - Global: calculateWinner (defined outside components)
 *    - Component: All variables in component function
 *    - Function: Variables inside nested functions
 * 
 * 2. LIFECYCLE:
 *    - Component mounts → useState creates state → renders
 *    - State updates → Component re-renders → New function scope created
 *    - Component unmounts → State destroyed
 * 
 * 3. CLOSURE:
 *    - Event handlers "close over" state variables
 *    - They remember state even when called later
 *    - Each render creates NEW closures with NEW state values
 * 
 * 4. IMMUTABILITY:
 *    - Never mutate state directly
 *    - Always create new arrays/objects
 *    - React uses reference equality to detect changes
 * 
 * 5. HOOKS:
 *    - useState: Persistent state between renders
 *    - useEffect: Side effects after render
 *    - Hooks MUST be at top level (not in conditions/loops)
 * 
 * 6. ASYNC (demonstrated in useEffect):
 *    - async/await for asynchronous operations
 *    - Useful for API calls, timers, etc.
 *    - State updates from async code still trigger re-renders
 */
```

---

# Priority 2: Module Pattern (Vanilla JavaScript)

## HTML (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-Tac-Toe - Module Pattern</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .game-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        .game-title {
            text-align: center;
            color: #333;
            margin-bottom: 1rem;
        }
        
        .game-info {
            text-align: center;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            min-height: 30px;
            font-weight: bold;
            color: #667eea;
        }
        
        .board {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(3, 100px);
            gap: 10px;
            margin-bottom: 1rem;
        }
        
        .square {
            background: #f0f0f0;
            border: none;
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s;
        }
        
        .square:hover:not(:disabled) {
            background: #e0e0e0;
            transform: scale(1.05);
        }
        
        .square:disabled {
            cursor: not-allowed;
        }
        
        .square.X {
            color: #667eea;
        }
        
        .square.O {
            color: #764ba2;
        }
        
        .square.winner {
            animation: pulse 0.5s ease-in-out;
        }
        
        .reset-button {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .reset-button:hover {
            background: #5568d3;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1 class="game-title">Tic-Tac-Toe</h1>
        <div class="game-info" id="gameInfo">Next Player: X</div>
        <div class="board" id="board"></div>
        <button class="reset-button" id="resetButton">New Game</button>
    </div>
    
    <script src="tictactoe-module.js"></script>
</body>
</html>
```

## JavaScript with Module Pattern (tictactoe-module.js)

```javascript
/**
 * MODULE PATTERN VERSION - Tic-Tac-Toe
 * 
 * Key Concepts Demonstrated:
 * 1. IIFE (Immediately Invoked Function Expression) - Creates private scope
 * 2. Closure - Inner functions accessing outer function variables
 * 3. Module pattern - Public API with private implementation
 * 4. Scope and Lifecycle - Understanding variable lifetime
 * 5. Immutability - Creating new objects instead of mutating
 * 6. Async operations - setTimeout, promises, async/await
 */

/**
 * IIFE - Immediately Invoked Function Expression
 * 
 * Syntax: (function() { ... })()
 * 
 * Scope: Creates a private scope
 * Lifecycle:
 *   - Function executes immediately when script loads
 *   - Variables inside are created
 *   - Returns public API object
 *   - Private variables persist as long as public API is referenced
 * 
 * Why? Prevents global namespace pollution
 */
const TicTacToeGame = (() => {
    /**
     * PRIVATE STATE
     * 
     * Scope: IIFE function scope - not accessible from outside
     * Lifecycle: 
     *   - Created when IIFE runs
     *   - Persist for entire application lifetime
     *   - Accessible via closure in returned functions
     * 
     * These variables are truly private - no way to access from outside
     */
    let state = {
        squares: Array(9).fill(null),  // Board state
        currentPlayer: 'X',             // Current player
        gameStatus: 'playing',          // 'playing', 'won', 'draw'
        winningSquares: null            // Indices of winning squares
    };
    
    /**
     * DOM element references
     * Scope: IIFE scope
     * Lifecycle: Set during init(), persist throughout app lifetime
     */
    let elements = {
        board: null,
        gameInfo: null,
        resetButton: null,
        squares: []
    };
    
    /**
     * PRIVATE UTILITY FUNCTIONS
     * 
     * These functions are only accessible within the IIFE
     * They demonstrate closure - they can access 'state' and 'elements'
     */
    
    /**
     * Calculate winner from current board state
     * 
     * Scope: IIFE scope - private function
     * Parameters: squares array (passed by reference, but we don't mutate it)
     * Returns: 'X', 'O', or null
     * 
     * Closure: Could access outer 'state', but receives squares as parameter
     *          for better testability and reusability
     */
    const calculateWinner = (squares) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        // Loop through each pattern
        for (const [a, b, c] of winPatterns) {
            // Check if three squares match and are not empty
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], pattern: [a, b, c] };
            }
        }
        
        return null; // No winner
    };
    
    /**
     * Check if board is full
     * Scope: IIFE scope
     * Closure: Has access to 'state', but receives squares for reusability
     */
    const isBoardFull = (squares) => {
        // every() returns true if ALL elements pass the test
        return squares.every(square => square !== null);
    };
    
    /**
     * Update game status message in DOM
     * Scope: IIFE scope
     * Closure: Accesses 'state' and 'elements' from outer scope
     * Side effect: Modifies DOM
     */
    const updateGameInfo = () => {
        let message = '';
        
        // Use switch for clear branching logic
        switch (state.gameStatus) {
            case 'won':
                // Find winner by checking squares (we know there's a winner)
                const result = calculateWinner(state.squares);
                message = `Winner: ${result.winner}! 🎉`;
                break;
            case 'draw':
                message = "It's a Draw! 🤝";
                break;
            case 'playing':
            default:
                message = `Next Player: ${state.currentPlayer}`;
        }
        
        elements.gameInfo.textContent = message;
    };
    
    /**
     * Render single square in DOM
     * Scope: IIFE scope
     * Lifecycle: Button element is created and persists in DOM
     * Closure: Has access to index, state, elements
     */
    const renderSquare = (index) => {
        const button = document.createElement('button');
        button.className = 'square';
        button.dataset.index = index; // Store index as data attribute
        
        // Get current value from state
        const value = state.squares[index];
        if (value) {
            button.textContent = value;
            button.classList.add(value); // Add 'X' or 'O' class
            button.disabled = true;
        }
        
        // Check if this square is part of winning combination
        if (state.winningSquares && state.winningSquares.includes(index)) {
            button.classList.add('winner');
        }
        
        /**
         * Event listener - demonstrates closure
         * This function closes over:
         *   - index (from renderSquare scope)
         *   - state (from IIFE scope)
         *   - handleSquareClick (from IIFE scope)
         * 
         * Lifecycle: Created when square is rendered, removed when square is removed
         */
        button.addEventListener('click', () => handleSquareClick(index));
        
        return button;
    };
    
    /**
     * Render entire board
     * Scope: IIFE scope
     * Side effects: Clears and rebuilds DOM
     * Immutability: Creates new DOM elements, doesn't mutate existing ones
     */
    const renderBoard = () => {
        // Clear existing board
        elements.board.innerHTML = '';
        
        // Create new array of square elements
        // This demonstrates immutability - we don't modify old squares
        elements.squares = state.squares.map((_, index) => {
            const square = renderSquare(index);
            elements.board.appendChild(square);
            return square;
        });
        
        updateGameInfo();
    };
    
    /**
     * ASYNC EXAMPLE: Simulate checking with server
     * 
     * Demonstrates:
     * - async/await syntax
     * - Promise handling
     * - Async operations with state
     * 
     * In real app, might validate move with server or save game state
     */
    const saveGameState = async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // In real app, would send to server:
        // const response = await fetch('/api/game', {
        //     method: 'POST',
        //     body: JSON.stringify(state)
        // });
        
        console.log('Game state saved:', state);
        return true;
    };
    
    /**
     * Handle square click
     * Scope: IIFE scope
     * Closure: Accesses and modifies 'state' from outer scope
     * 
     * Demonstrates:
     * - State updates
     * - Immutability (creating new arrays)
     * - Async operations
     */
    const handleSquareClick = async (index) => {
        // Guard clauses - exit early if invalid move
        if (state.squares[index] !== null) return; // Already filled
        if (state.gameStatus !== 'playing') return; // Game over
        
        /**
         * IMMUTABILITY DEMONSTRATION
         * 
         * Instead of: state.squares[index] = state.currentPlayer ❌
         * We create new array: [...state.squares] ✅
         * 
         * Why? 
         * - Easier to track changes
         * - Enables undo/redo
         * - Prevents bugs from unexpected mutations
         * - Makes code more predictable
         */
        const newSquares = [...state.squares]; // Spread creates new array
        newSquares[index] = state.currentPlayer;
        
        // Update state with new array
        state.squares = newSquares;
        
        // Check for winner with new board state
        const result = calculateWinner(state.squares);
        
        if (result) {
            // We have a winner!
            state.gameStatus = 'won';
            state.winningSquares = result.pattern;
        } else if (isBoardFull(state.squares)) {
            // Board full, no winner = draw
            state.gameStatus = 'draw';
        } else {
            // Game continues - switch player
            // Ternary operator: condition ? ifTrue : ifFalse
            state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
        }
        
        // Re-render with new state
        renderBoard();
        
        /**
         * ASYNC OPERATION EXAMPLE
         * This runs after state update and render
         * Demonstrates async/await in real application flow
         */
        try {
            await saveGameState();
        } catch (error) {
            console.error('Error saving game:', error);
        }
    };
    
    /**
     * Reset game to initial state
     * Scope: IIFE scope
     * Demonstrates: Complete state reset with new objects
     */
    const resetGame = () => {
        /**
         * Create new state object
         * Lifecycle: Old state is garbage collected, new state persists
         * Immutability: We replace entire state, not mutate it
         */
        state = {
            squares: Array(9).fill(null),
            currentPlayer: 'X',
            gameStatus: 'playing',
            winningSquares: null
        };
        
        renderBoard();
    };
    
    /**
     * Initialize game - set up DOM and event listeners
     * Scope: IIFE scope, but will be exposed in public API
     * Lifecycle: Called once when game starts
     */
    const init = () => {
        // Cache DOM elements
        // Lifecycle: These references persist throughout app lifetime
        elements.board = document.getElementById('board');
        elements.gameInfo = document.getElementById('gameInfo');
        elements.resetButton = document.getElementById('resetButton');
        
        // Bind reset button
        // Closure: Event handler closes over resetGame function
        elements.resetButton.addEventListener('click', resetGame);
        
        // Initial render
        renderBoard();
    };
    
    /**
     * PUBLIC API
     * 
     * This object is returned from the IIFE
     * Only these functions are accessible from outside
     * They form a "closure" around the private state and functions
     * 
     * Scope: Returned to global scope (assigned to TicTacToeGame)
     * Lifecycle: Exists as long as page is loaded
     * Closure: These functions remember the private variables even though
     *          the IIFE has finished executing
     */
    return {
        init,           // Initialize game
        reset: resetGame, // Reset game (exposed with different name)
        
        // Expose getState for debugging (read-only)
        // Returns copy of state to prevent external mutation
        getState: () => ({
            ...state,
            squares: [...state.squares] // Clone arrays too
        })
    };
})(); // <-- IIFE immediately invoked here

/**
 * Start the game
 * This runs when script loads
 * 
 * Scope: Global scope
 * Lifecycle: Executes once on page load
 */
TicTacToeGame.init();

/**
 * UNDERSTANDING CLOSURE EXAMPLE:
 * 
 * The IIFE has finished executing, but 'state' and 'elements' still exist!
 * Why? Because the functions we returned (init, reset, getState) still
 * reference them.
 * 
 * This is closure: Functions "remember" their lexical environment
 * even after the outer function has returned.
 * 
 * Try in console:
 * TicTacToeGame.getState()  // ✅ Works - returns state copy
 * TicTacToeGame.state       // ❌ undefined - state is private
 */

/**
 * KEY CONCEPTS SUMMARY:
 * 
 * 1. SCOPE LEVELS:
 *    Global → IIFE → Function → Block
 *    - Variables in outer scopes are accessible in inner scopes
 *    - Variables in inner scopes are NOT accessible in outer scopes
 * 
 * 2. LIFECYCLE:
 *    - Global variables: Created on script load, destroyed on page unload
 *    - IIFE variables: Created when IIFE runs, persist via closure
 *    - Function variables: Created on call, destroyed when function ends
 *    - Event listener variables: Persist as long as listener exists
 * 
 * 3. CLOSURE:
 *    - Inner function "remembers" outer function's variables
 *    - Enables private variables (data hiding)
 *    - Each function has access to its lexical scope
 * 
 * 4. IMMUTABILITY:
 *    - Don't mutate arrays/objects: array[i] = x ❌
 *    - Create new arrays/objects: [...array] ✅
 *    - Benefits: predictability, easier debugging, enables undo/redo
 * 
 * 5. ASYNC OPERATIONS:
 *    - async function returns Promise
 *    - await pauses execution until Promise resolves
 *    - Useful for network requests, timers, file operations
 *    - Code after await runs when async operation completes
 */
```

---

# Priority 3: Factory Function Pattern

## HTML (Same as Module Pattern)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-Tac-Toe - Factory Pattern</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .game-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        .game-title {
            text-align: center;
            color: #333;
            margin-bottom: 1rem;
        }
        
        .game-info {
            text-align: center;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            min-height: 30px;
            font-weight: bold;
            color: #667eea;
        }
        
        .board {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(3, 100px);
            gap: 10px;
            margin-bottom: 1rem;
        }
        
        .square {
            background: #f0f0f0;
            border: none;
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s;
        }
        
        .square:hover:not(:disabled) {
            background: #e0e0e0;
            transform: scale(1.05);
        }
        
        .square:disabled {
            cursor: not-allowed;
        }
        
        .square.X {
            color: #667eea;
        }
        
        .square.O {
            color: #764ba2;
        }
        
        .square.winner {
            animation: pulse 0.5s ease-in-out;
        }
        
        .reset-button {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .reset-button:hover {
            background: #5568d3;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1 class="game-title">Tic-Tac-Toe</h1>
        <div class="game-info" id="gameInfo">Next Player: X</div>
        <div class="board" id="board"></div>
        <button class="reset-button" id="resetButton">New Game</button>
    </div>
    
    <script src="tictactoe-factory.js"></script>
</body>
</html>
```

## JavaScript with Factory Function (tictactoe-factory.js)

```javascript
/**
 * FACTORY FUNCTION PATTERN - Tic-Tac-Toe
 * 
 * Key Concepts Demonstrated:
 * 1. Factory Functions - Functions that return objects
 * 2. Closure - Private variables via function scope
 * 3. Object Composition - Building complex objects from simple ones
 * 4. Scope and Lifecycle - Variable lifetime in nested functions
 * 5. Immutability - Never mutating state directly
 * 6. Async/Await - Asynchronous operations
 * 
 * Advantages:
 * - Can create multiple instances
 * - No 'this' keyword confusion
 * - Clear variable scoping
 * - Easy to test and compose
 */

/**
 * Utility: Calculate winner
 * 
 * Scope: Global scope - available everywhere
 * Lifecycle: Created once when script loads
 * Pure function: Same input always gives same output, no side effects
 * 
 * @param {Array} squares - The board state
 * @returns {Object|null} - {winner: 'X'|'O', pattern: [indices]} or null
 */
function calculateWinner(squares) {
    const patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    for (const [a, b, c] of patterns) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], pattern: [a, b, c] };
        }
    }
    
    return null;
}

/**
 * Factory: Create game state manager
 * 
 * Factory function returns an object with methods
 * The returned object has "private" variables via closure
 * 
 * Scope: Global function
 * Lifecycle: Function body executes each time createGameState() is called
 * 
 * What is a factory? A function that creates and returns objects
 * Why use it? Encapsulation without classes, multiple instances possible
 */
function createGameState() {
    /**
     * Private state - only accessible within this function
     * 
     * Scope: createGameState function scope
     * Lifecycle:
     *   - Created when createGameState() is called
     *   - Persists as long as returned object exists (via closure)
     *   - Destroyed when no references to returned object exist
     * 
     * Closure: The functions we return can access these variables
     */
    let squares = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameStatus = 'playing'; // 'playing', 'won', 'draw'
    let winningPattern = null;
    
    /**
     * Return object with public methods
     * Each method is a closure that can access private variables above
     */
    return {
        /**
         * Get current board state
         * 
         * Closure: Accesses 'squares' from outer scope
         * Immutability: Returns copy to prevent external mutation
         * 
         * @returns {Array} - Copy of squares array
         */
        getSquares: () => [...squares],
        
        /**
         * Get square at specific index
         * 
         * @param {number} index - Square index (0-8)
         * @returns {string|null} - 'X', 'O', or null
         */
        getSquare: (index) => squares[index],
        
        /**
         * Get current player
         * 
         * Closure: Accesses 'currentPlayer' from outer scope
         * @returns {string} - 'X' or 'O'
         */
        getCurrentPlayer: () => currentPlayer,
        
        /**
         * Get game status
         * @returns {string} - 'playing', 'won', or 'draw'
         */
        getStatus: () => gameStatus,
        
        /**
         * Get winning pattern if game is won
         * @returns {Array|null} - Array of winning indices or null
         */
        getWinningPattern: () => winningPattern,
        
        /**
         * Make a move
         * 
         * Closure: Accesses and modifies all private variables
         * Immutability: Creates new array instead of mutating
         * 
         * @param {number} index - Square index to play
         * @returns {boolean} - True if move was valid
         */
        makeMove: (index) => {
            // Validate move
            if (squares[index] !== null) return false;
            if (gameStatus !== 'playing') return false;
            
            /**
             * IMMUTABILITY PRINCIPLE
             * 
             * Instead of: squares[index] = currentPlayer ❌
             * We do: squares = newSquares ✅
             * 
             * Why create new array?
             * - Easier to track changes over time
             * - Enables undo/redo functionality
             * - Prevents bugs from unexpected mutations
             * - Makes debugging easier (can compare old vs new state)
             */
            const newSquares = [...squares]; // Spread operator creates shallow copy
            newSquares[index] = currentPlayer;
            squares = newSquares; // Replace old array with new one
            
            // Check for winner
            const result = calculateWinner(squares);
            if (result) {
                gameStatus = 'won';
                winningPattern = result.pattern;
                return true;
            }
            
            // Check for draw
            if (squares.every(square => square !== null)) {
                gameStatus = 'draw';
                return true;
            }
            
            // Switch player - ternary operator
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            return true;
        },
        
        /**
         * Reset game state
         * 
         * Closure: Resets all private variables
         * Lifecycle: Creates new arrays, old ones are garbage collected
         */
        reset: () => {
            squares = Array(9).fill(null);
            currentPlayer = 'X';
            gameStatus = 'playing';
            winningPattern = null;
        }
    };
}

/**
 * Factory: Create DOM controller
 * 
 * Separates game logic from DOM manipulation
 * Demonstrates composition: DOMController uses GameState
 * 
 * @param {Object} gameState - Game state manager
 * @returns {Object} - DOM controller with render methods
 */
function createDOMController(gameState) {
    /**
     * Private DOM element references
     * 
     * Scope: createDOMController function scope
     * Lifecycle: Set during init(), persist while controller exists
     * Closure: Accessible in all returned methods
     */
    let elements = {
        board: null,
        gameInfo: null,
        resetButton: null
    };
    
    /**
     * Private helper: Update game info display
     * 
     * Scope: createDOMController function scope
     * Closure: Accesses 'elements' and 'gameState'
     * Side effect: Modifies DOM
     */
    const updateGameInfo = () => {
        let message = '';
        const status = gameState.getStatus();
        
        if (status === 'won') {
            const result = calculateWinner(gameState.getSquares());
            message = `Winner: ${result.winner}! 🎉`;
        } else if (status === 'draw') {
            message = "It's a Draw! 🤝";
        } else {
            message = `Next Player: ${gameState.getCurrentPlayer()}`;
        }
        
        elements.gameInfo.textContent = message;
    };
    
    /**
     * Private helper: Create square button element
     * 
     * @param {number} index - Square index
     * @returns {HTMLElement} - Button element
     * 
     * Closure: Each button's click handler closes over:
     *   - index (from this function's parameter)
     *   - gameState (from createDOMController scope)
     *   - renderBoard (from createDOMController scope)
     */
    const createSquareElement = (index) => {
        const button = document.createElement('button');
        button.className = 'square';
        
        const value = gameState.getSquare(index);
        if (value) {
            button.textContent = value;
            button.classList.add(value);
            button.disabled = true;
        }
        
        // Highlight winning squares
        const winPattern = gameState.getWinningPattern();
        if (winPattern && winPattern.includes(index)) {
            button.classList.add('winner');
        }
        
        /**
         * Event handler - demonstrates closure
         * 
         * Scope: This function has access to:
         *   - index (parameter of createSquareElement)
         *   - gameState (from createDOMController scope)
         *   - renderBoard (from return object below)
         * 
         * Lifecycle: Created when button is created, attached to DOM element
         */
        button.addEventListener('click', async () => {
            // Make move in game state
            const moveSuccess = gameState.makeMove(index);
            
            if (moveSuccess) {
                // Re-render board with new state
                renderBoard();
                
                /**
                 * ASYNC EXAMPLE: Simulate saving to server
                 * 
                 * async/await allows us to write asynchronous code
                 * that looks synchronous
                 * 
                 * Common use cases:
                 * - API calls: fetch('/api/game')
                 * - Timers: await delay(1000)
                 * - File operations: await readFile()
                 */
                await saveGameToServer(gameState.getSquares());
            }
        });
        
        return button;
    };
    
    /**
     * Async helper: Simulate server save
     * 
     * Demonstrates:
     * - async function declaration
     * - Promise creation
     * - setTimeout with promises
     * - Error handling with try/catch
     * 
     * @param {Array} squares - Current board state
     * @returns {Promise} - Resolves when save completes
     */
    const saveGameToServer = async (squares) => {
        try {
            // Simulate network delay with Promise
            await new Promise(resolve => {
                setTimeout(() => {
                    console.log('Game saved:', squares);
                    resolve();
                }, 100);
            });
            
            // In real app, would do:
            // const response = await fetch('/api/game', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ squares })
            // });
            // return await response.json();
            
            return { success: true };
        } catch (error) {
            console.error('Save failed:', error);
            return { success: false };
        }
    };
    
    /**
     * Return public API
     * 
     * These functions form closures over:
     * - elements (private to this factory)
     * - gameState (passed as parameter)
     * - private helper functions (updateGameInfo, createSquareElement, etc.)
     */
    return {
        /**
         * Initialize DOM references
         * 
         * Scope: Returned object method
         * Lifecycle: Called once to set up references
         * Closure: Sets values of 'elements' from outer scope
         */
        init: () => {
            elements.board = document.getElementById('board');
            elements.gameInfo = document.getElementById('gameInfo');
            elements.resetButton = document.getElementById('resetButton');
            
            /**
             * Bind reset button
             * 
             * Closure: Event handler accesses gameState and renderBoard
             * Lifecycle: Handler persists until button is removed from DOM
             */
            elements.resetButton.addEventListener('click', () => {
                gameState.reset();
                renderBoard();
            });
        },
        
        /**
         * Render board to DOM
         * 
         * Closure: Accesses elements, gameState, createSquareElement
         * Side effects: Clears and rebuilds DOM
         * Immutability: Creates new elements instead of modifying existing
         */
        render: function renderBoard() {
            // Clear existing board
            elements.board.innerHTML = '';
            
            // Create 9 squares
            // Array.from creates array from iterable or array-like object
            Array.from({ length: 9 }, (_, index) => {
                const square = createSquareElement(index);
                elements.board.appendChild(square);
            });
            
            updateGameInfo();
        }
    };
}

/**
 * Application initialization
 * 
 * Scope: Global scope
 * Lifecycle: Executes once when script loads
 * 
 * This is where we compose our application:
 * 1. Create game state (data layer)
 * 2. Create DOM controller (view layer)
 * 3. Connect them together
 */

// Create game state instance
// Lifecycle: Persists for page lifetime
const gameState = createGameState();

// Create DOM controller with game state
// Demonstrates composition: DOM controller depends on game state
const domController = createDOMController(gameState);

// Initialize and render
domController.init();
domController.render();

/**
 * ADVANCED EXAMPLE: Creating multiple games
 * 
 * Factory pattern allows multiple independent instances:
 * 
 * const game1 = createGameState();
 * const game2 = createGameState();
 * const dom1 = createDOMController(game1);
 * const dom2 = createDOMController(game2);
 * 
 * Each game has its own private state, completely isolated!
 * This is impossible with module pattern (singleton)
 */

/**
 * KEY CONCEPTS SUMMARY:
 * 
 * 1. FACTORY FUNCTIONS:
 *    - Function that returns an object
 *    - Can create multiple instances
 *    - Private variables via closure
 *    - No 'this' keyword needed
 * 
 * 2. SCOPE HIERARCHY:
 *    Global → Factory Function → Returned Methods
 *    - Inner scopes can access outer scopes
 *    - Outer scopes cannot access inner scopes
 *    - Each factory call creates new scope
 * 
 * 3. LIFECYCLE:
 *    - Factory function: Executes each time it's called
 *    - Private variables: Created on factory call, persist via closure
 *    - Returned object: Lives until no references exist
 *    - Event handlers: Live until element is removed from DOM
 * 
 * 4. CLOSURE:
 *    - Returned functions "remember" factory's variables
 *    - Each instance has its own closure with its own variables
 *    - Enables true data privacy
 *    - Functions retain access even after factory returns
 * 
 * 5. IMMUTABILITY:
 *    - Create new arrays/objects instead of mutating: [...array]
 *    - Makes state changes explicit and traceable
 *    - Prevents bugs from unexpected changes
 *    - Easier to implement undo/redo
 * 
 * 6. ASYNC/AWAIT:
 *    - async keyword makes function return Promise
 *    - await pauses execution until Promise resolves
 *    - Makes async code read like sync code
 *    - Always wrap in try/catch for error handling
 * 
 * 7. COMPOSITION:
 *    - Build complex objects from simple ones
 *    - DOMController uses GameState
 *    - Each piece has single responsibility
 *    - Easy to test and modify independently
 */
```

---

## Summary Comparison

| Concept | React Hooks | Module Pattern | Factory Pattern |
|---------|-------------|----------------|-----------------|
| **Instance** | One per component | Single (singleton) | Multiple possible |
| **State** | useState hook | Private variables (IIFE) | Private variables (closure) |
| **Lifecycle** | Component mount/unmount | Script load to page unload | Function call to GC |
| **Scope** | Component function | IIFE function | Factory function |
| **Reusability** | Very high (components) | Low (singleton) | Very high (multiple instances) |
| **Best for** | React apps (2026 standard) | Single-instance utilities | Reusable objects |
| **Complexity** | Medium (hooks learning curve) | Medium (IIFE pattern) | Low (simple functions) |

All three demonstrate the same core concepts: **scope, closure, immutability, and async operations**, just with different patterns!