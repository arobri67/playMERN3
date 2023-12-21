import { useState, useEffect } from "react";
import WgLeftPanel from "../../../components/WgLeftPanel";
import WgMidPanel from "../../../components/WgMidPanel";
import WgRightPanel from "../../../components/WgRightPanel";
import WgKeyboard from "../../../components/WgKeyboard";
import wordList from "../../../../DATA/wordList";
import "./WordGuess.css";

const WordGuess = () => {
  const [isPlaying, setPlay] = useState(false);
  const [gameState, setGameStat] = useState("off");
  const [word, setWord] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [wrongLetter, setWrongLetter] = useState([]);
  const [errorNumber, setErrorNumber] = useState(0);
  const maxError = 5;

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
      const isGameOver = errorNumber === maxError;
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
          <WgLeftPanel
            isPlaying={isPlaying}
            wrongLetter={wrongLetter}
            handlePlay={handlePlay}
          />
          <WgMidPanel
            isPlaying={isPlaying}
            gameState={gameState}
            wordArray={wordArray}
          />
          <WgRightPanel gameState={gameState} length={wrongLetter.length} />
        </section>
        <section className="wg-bottom">
          <WgKeyboard wrongLetter={wrongLetter} handleKeys={handleKeys} />
        </section>
      </section>
    </main>
  );
};

export default WordGuess;
