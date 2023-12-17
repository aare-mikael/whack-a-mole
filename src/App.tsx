import React, { useState, useEffect } from "react";
import "./App.css";

import hole from "./assets/hole.png";
import mole from "./assets/mole.png";

function App() {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(1500);
  const [gameState, setGameState] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);

  function startGame() {
    resetGame();
  }

  function endGame() {
    setGameState(false);
    setTimer(0);
  }

  function resetGame() {
    setScore(0);
    endGame();
    setDifficulty(1500);
    setTimer(30);
    setGameState(true);
  }

  function showMole(index: number) {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = true;
      return newMoles;
    });
  }

  function hideMole(index: number) {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = false;
      return newMoles;
    });
  }

  function whackMole(index: number) {
    if (!moles[index]) return;
    hideMole(index);
    setScore((score) => score + 1);
  }

  function changeDifficulty(difficulty: string) {
    if (difficulty === "easy") {
      setDifficulty(1500);
    } else if (difficulty === "medium") {
      setDifficulty(1200);
    } else if (difficulty === "hard") {
      setDifficulty(900);
    } else if (difficulty === "impossible") {
      setDifficulty(500);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameState) return;
      const randomIndex = Math.floor(Math.random() * moles.length);
      showMole(randomIndex);
      setTimeout(() => {
        hideMole(randomIndex);
      }, difficulty);
    }, 1500);

    return () => clearInterval(interval);
  }, [moles, difficulty, gameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameState) return;
      if (timer === 0) {
        endGame();
        return;
      }
      setTimer((timer) => timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, timer, endGame]);

  const renderGameSetup = () => {
    return (
      <div className="Game-setup">
        <div className="Welcome">
          <p>Welcome to Whack-a-Mole!</p>
          <p>You have 30 seconds to whack as many moles as you can!</p>
          <p>
            Whack the moles to score points. By default difficulty is on Easy,
            which gives you 1.5 seconds to whack.
          </p>
          <p>On medium you have 1.2 seconds, on hard you have 0.9 seconds,</p>
          <p>and on impossible you have 0.5 seconds.</p>
          <p>Click start when you're ready!</p>
          <p>Good luck!</p>
        </div>
        <div className="Difficulty">
          <button onClick={() => changeDifficulty("easy")}>Easy</button>
          <button onClick={() => changeDifficulty("medium")}>Medium</button>
          <button onClick={() => changeDifficulty("hard")}>Hard</button>
          <button onClick={() => changeDifficulty("impossible")}>
            Impossible
          </button>
        </div>
      </div>
    );
  };

  const renderGame = () => {
    return (
      <div className="Game">
        <div className="Game-box">
          {moles.map((isMole, index) => (
            <img
              key={index}
              src={isMole ? mole : hole}
              alt="Mole"
              onClick={() => {
                whackMole(index);
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="Header">
        <h1>Whack-a-mole</h1>
      </header>

      <div className="Body">
        <div className="Information">
          <p>Points: {score}</p>
          <p>Time: {timer} seconds left</p>
        </div>

        {!gameState ? renderGameSetup() : renderGame()}

        <div className="Game-buttons">
          <button onClick={startGame}>Start</button>
          <button onClick={endGame}>End</button>
          <button onClick={resetGame}>Reset</button>
        </div>
      </div>

      <footer className="Footer">
        <p>
          <a
            className="GitHub"
            href="https://github.com/aare-mikael/whack-a-mole"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project repository
          </a>
        </p>
        <p>Thanks for playing!</p>
        <p>
          <a
            className="LinkedIn"
            href="https://www.linkedin.com/in/mikaelaare/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
