import React, { useState, useEffect, useCallback } from 'react';
import './ColorGame.css';

// Pure utility functions
const randomRGB = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const generateColors = (count) => 
  Array.from({ length: count }, randomRGB);

const pickRandom = (array) => 
  array[Math.floor(Math.random() * array.length)];

const normalizeRGB = (rgb) => rgb.replace(/\s+/g, '');

// Custom hook for game logic
const useColorGame = (initialMode = 'hard') => {
  const [mode, setMode] = useState(initialMode);
  const [colors, setColors] = useState([]);
  const [targetColor, setTargetColor] = useState('');
  const [message, setMessage] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [hiddenSquares, setHiddenSquares] = useState(new Set());

  const numSquares = mode === 'easy' ? 3 : 6;

  const resetGame = useCallback(() => {
    const newColors = generateColors(numSquares);
    const newTarget = pickRandom(newColors);
    
    setColors(newColors);
    setTargetColor(newTarget);
    setMessage('');
    setGameWon(false);
    setHiddenSquares(new Set());
  }, [numSquares]);

  const checkGuess = useCallback((color, index) => {
    if (gameWon || hiddenSquares.has(index)) return;

    if (normalizeRGB(color) === normalizeRGB(targetColor)) {
      setMessage('Correct!');
      setGameWon(true);
    } else {
      setMessage('Try Again');
      setHiddenSquares(prev => new Set([...prev, index]));
    }
  }, [targetColor, gameWon, hiddenSquares]);

  const changeMode = useCallback((newMode) => {
    setMode(newMode);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return {
    colors,
    targetColor,
    message,
    gameWon,
    hiddenSquares,
    numSquares,
    mode,
    resetGame,
    checkGuess,
    changeMode
  };
};

// Square component
const Square = ({ color, onClick, isHidden, isWinner }) => (
  <div
    className="square"
    style={{
      background: isHidden ? '#232323' : color,
      display: isHidden && !isWinner ? 'none' : 'block'
    }}
    onClick={onClick}
  />
);

// Mode button component
const ModeButton = ({ mode, currentMode, onClick, children }) => (
  <button
    className={`mode ${mode === currentMode ? 'selected' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Main component
const ColorGame = () => {
  const {
    colors,
    targetColor,
    message,
    gameWon,
    hiddenSquares,
    numSquares,
    mode,
    resetGame,
    checkGuess,
    changeMode
  } = useColorGame('hard');

  return (
    <>
      <h1 style={{ background: gameWon ? targetColor : 'steelblue' }}>
        The Great
        <br />
        <span id="colorDisplay">{targetColor}</span>
        <br />
        Color Game
      </h1>

      <div id="stripe">
        <button id="reset" onClick={resetGame}>
          {gameWon ? 'Play Again?' : 'New Colors'}
        </button>
        <span id="message">{message}</span>
        <ModeButton mode="easy" currentMode={mode} onClick={() => changeMode('easy')}>
          Easy
        </ModeButton>
        <ModeButton mode="hard" currentMode={mode} onClick={() => changeMode('hard')}>
          Hard
        </ModeButton>
      </div>

      <div id="container">
        {colors.map((color, index) => (
          <Square
            key={index}
            color={color}
            onClick={() => checkGuess(color, index)}
            isHidden={hiddenSquares.has(index) || index >= numSquares}
            isWinner={gameWon}
          />
        ))}
      </div>
    </>
  );
};

export default ColorGame;

// ✅ Custom hooks for logic reuse
// ✅ Component composition
// ✅ Declarative UI
// ✅ State management with hooks
// ✅ Industry standard React pattern