import { useState, useEffect } from "react";
import "./WordGuess.css";
import wordList from "../../../../DATA/wordList";

const WordGuess = () => {
  const alphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );

  const [isPlaying, setPlay] = useState(false);
  const [gameState, setGameStat] = useState("off");
  const [word, setWord] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [wrongLetter, setWrongLetter] = useState([]);
  const [errorNumber, setErrorNumber] = useState(0);

  const handlePlay = () => {
    if (gameState !== "playing") {
      setWord("");
      setWordArray([]);
      setPlay(true);
      setGameStat("playing");
      setErrorNumber(0);
      setWrongLetter([]);
    }
  };

  const handleKeys = (e) => {
    if (isPlaying === true && gameState === "playing") {
      const key = e.target.textContent;
      setSelectedLetter(key);
    }
  };

  const wordArrayMaker = (word) => {
    if (word !== "") {
      const newWordArray = word.split("").map((letter) => ({
        letter,
        isFound: false,
      }));
      if (newWordArray) {
        newWordArray[0].isFound = true;
      }
      setWordArray(newWordArray);
    }
  };

  useEffect(() => {
    if (gameState === "playing") {
      const randomNumber = Math.floor(Math.random() * 29);
      const newWord = wordList[`${randomNumber}`].word;
      setWord(newWord);
      wordArrayMaker(newWord);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (selectedLetter !== "") {
      const guess = wordArray.some((item) => item.letter === selectedLetter);
      if (guess) {
        const updatedWordArray = wordArray.map((item) =>
          item.letter === selectedLetter ? { ...item, isFound: true } : item
        );
        setWordArray(updatedWordArray);
      } else {
        setWrongLetter((prevWrongLetters) => [
          ...prevWrongLetters,
          selectedLetter,
        ]);
        setErrorNumber((prevErrorNumber) => prevErrorNumber + 1);
      }
    }
  }, [selectedLetter]);

  useEffect(() => {
    if (wordArray.length !== 0) {
      const isGameWon = wordArray.every((item) => item.isFound === true);
      const isGameOver = errorNumber === 5;
      if (isGameWon === true && isGameOver === false) {
        setGameStat("win");
        setPlay(false);
      } else if (isGameOver) {
        setGameStat("game over");
        setPlay(false);
      }
    }
  }, [errorNumber, wordArray]);

  return (
    <main>
      <section className="wg container">
        <section className="wg-top">
          <article className="wg-wrong-container">
            <div className="wg-wrong-body">
              <h2>Word Guess</h2>
              {isPlaying ? (
                <>
                  <h3>Wrong letters</h3>
                  <ul>
                    {wrongLetter.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              <div
                role="button"
                className="play-wg-btn"
                onClick={() => handlePlay()}
              >
                /play
              </div>
            </div>
          </article>
          {isPlaying ? (
            <article className="wg-word-container">
              {gameState === "game over" ? (
                <>
                  <p className="endgame-newgame-msg">The word to find was:</p>
                  <ul>
                    {wordArray.map((item, index) => (
                      <li key={index}>
                        <div>{item.letter}</div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <ul>
                  {wordArray.map((item, index) => (
                    <li key={index}>
                      {item.isFound ? <div>{item.letter}</div> : <div></div>}
                    </li>
                  ))}
                </ul>
              )}

              {gameState === "win" || gameState === "game over" ? (
                <p className="endgame-newgame-msg">
                  Press <span>/play</span> for a new game!
                </p>
              ) : null}
            </article>
          ) : (
            <article className="wg-word-message">
              <p>
                Hit <span>/play</span> to start a new game!
              </p>
            </article>
          )}

          <article className="wg-error-container">
            <div className="wg-error-body">
              {gameState === "game over" ? (
                <p className="endgame-msg">You did not guess the word...</p>
              ) : null}
              {gameState === "win" ? (
                <p className="endgame-msg">
                  Congratulation, you guess the word!!
                </p>
              ) : null}
              <p className="error-msg">
                You have {wrongLetter.length} error
                {wrongLetter.length > 1 ? "s" : null} (max. 5)
              </p>
            </div>
          </article>
        </section>
        <section className="wg-bottom">
          <article className="keyboard-container">
            <div className="keyboard-body">
              <ul>
                {alphabet.map((item, index) => (
                  <li key={index}>
                    {wrongLetter.some((letter) => letter === item) ? (
                      <div className="btn-wrong-letter"></div>
                    ) : (
                      <div
                        className="btn-good-letter"
                        role="button"
                        onClick={handleKeys}
                      >
                        {item}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
};

export default WordGuess;
