import React, { useState, useEffect } from "react";
import "../css/Color.css";

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [status, setStatus] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    generateNewGame();
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateNewGame = () => {
    const newTargetColor = getRandomColor();
    const newOptions = [newTargetColor];

    while (newOptions.length < 6) {
      const randomColor = getRandomColor();
      if (!newOptions.includes(randomColor)) {
        newOptions.push(randomColor);
      }
    }

    setTargetColor(newTargetColor);
    setOptions(shuffleArray(newOptions));
    setStatus("");
    setTimeLeft(15);
    setWrongGuesses(0);
  };

  const resetGame = () => {
    setScore(0);
    generateNewGame();
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      const newScore = score + 1;
      setScore(newScore);
      setStatus("You are correct!");
      document.querySelector(".game-status").classList.add("correct");

      setTimeout(() => {
        document.querySelector(".game-status").classList.remove("correct");
        generateNewGame();
      }, 1000);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("highScore", newScore);
        setShowModal(true);
      }
    } else {
      setStatus("You are wrong! Score reset.");
      setScore(0);
      document.querySelector(".game-status").classList.add("wrong");

      setTimeout(() => {
        document.querySelector(".game-status").classList.remove("wrong");
        generateNewGame();
      }, 1000);
    }
  };

  return (
    <div className="body">
      <div className="game-container">
        <div className="header">
          <p className="colorText">Colour Guessing Game</p>
          <p className="score" data-testid="score">Score: {score}</p>
          {/* <p>Time Left: {timeLeft}s</p> */}
          <button className="btn" data-testid="newGameButton" onClick={resetGame}>New Game</button>
        </div>
        <div className="border-line"></div>

        <div className="main">
            <p className="game-title" data-testid="gameInstructions">Instruction: You have an option of six colours to choose from to guess the exact colour in the box!</p>
          <h2 className="target-color" data-testid="colorBox" style={{ backgroundColor: targetColor }}>
          </h2>
        </div>

        <div className="colours">
          {options.map((color, index) => (
            <div
              key={index}
              className="color-box"
              data-testid="colorOption"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
            ></div>
          ))}
        </div>

        <p className="game-status" data-testid="gameStatus">{status}</p>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>New High Score!</h2>
            <p>You've set a new high score: {highScore}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorGame;
