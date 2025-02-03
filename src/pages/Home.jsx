import React, { useState, useEffect } from "react";
// import "./ColorGame.css";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("#FFFFFF");
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    generateNewGame();
  }, []);

  const generateNewGame = () => {
    const newTargetColor = getRandomColor();
    const colorOptions = [newTargetColor, ...Array(5).fill().map(getRandomColor)];
    setTargetColor(newTargetColor);
    setColors(shuffleArray(colorOptions));
    setStatus("");
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setStatus("Correct!");
      generateNewGame();
    } else {
      setStatus("Wrong! Try again.");
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-instructions" data-testid="gameInstructions">Guess the Correct Color!</h1>
      <div
        className="color-box"
        style={{ backgroundColor: targetColor }}
        data-testid="colorBox"
      ></div>
      <div className="color-options">
        {colors.map((color, index) => (
          <button
            key={index}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            data-testid="colorOption"
          ></button>
        ))}
      </div>
      <p className="game-status" data-testid="gameStatus">{status}</p>
      <p className="score" data-testid="score">Score: {score}</p>
      <button
        onClick={generateNewGame}
        className="new-game-button"
        data-testid="newGameButton"
      >
        New Game
      </button>
    </div>
  );
};

export default ColorGame;
