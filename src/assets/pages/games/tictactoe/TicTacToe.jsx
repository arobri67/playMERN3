import { useState, useEffect } from "react";
import TttLeftPanel from "../../../components/TttLeftPanel";
import TttMiddlePanel from "../../../components/TttMiddlePanel";
import TttRightPanel from "../../../components/TttRightPanel";
import "./TicTacToe.css";

const TicTacToe = () => {
  const gridTemplate = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const player1 = "X";
  const player2 = "O";
  const [endGame, setEndGame] = useState(null);
  const [grid, setGrid] = useState(gridTemplate);
  const [isPlaying, setPlay] = useState(false);
  const [turn, setTurn] = useState(player1);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [playToogle, setPlayToogle] = useState(true);

  const handleBtn = (rowIndex, colIndex, cell) => {
    if (isPlaying === true && cell === null) {
      const newGrid = [...grid];
      newGrid[rowIndex][colIndex] = turn;
      setGrid(newGrid);
      if (turn === player1) {
        setTurn(player2);
      } else {
        setTurn(player1);
      }
    }
  };

  const handlePlay = () => {
    if (playToogle) {
      setPlay(true);
      setGrid([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ]);
      const randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber === 0) {
        setTurn(player1);
      } else if (randomNumber === 1) {
        setTurn(player2);
      }
      setEndGame(null);
      setPlayToogle(false);
    }
  };
  //function to check a line. check if in a line there is only X or only O
  const checkLine = (line) => {
    return (
      line.every((cell) => cell === "X") || line.every((cell) => cell === "O")
    );
  };
  //function to check a row. We give an array and we ask to if at least one row has same symbol (with checkline)
  const checkRow = (array) => {
    return array.some((row) => checkLine(row));
  };
  //function to check a column. fist the grid is transposed. Like that every row -> column and every column -> row. Then we can use checkRow and checkLine to do the job
  const checkColumn = (array) => {
    const transposedArray = array[0].map((_, i) => array.map((row) => row[i]));
    return checkRow(transposedArray);
  };
  //function to check a diagonal. Here we use the row number and index number to the two diagonals of the 3X3 grid
  const checkDiagonals = (array) => {
    const diagonal1 = array.map((row, i) => row[i]);
    const diagonal2 = array.map((row, i) => row[array.length - 1 - i]);
    return checkLine(diagonal1) || checkLine(diagonal2);
  };
  //function to handle a full grid with no winner, Check if cell of every row are not null
  const isGridFull = (array) => {
    return array.every((row) => row.every((cell) => cell !== null));
  };

  useEffect(() => {
    if (checkRow(grid) || checkColumn(grid) || checkDiagonals(grid)) {
      if (turn === "X") {
        setEndGame("Player 2 wins!!");
        setScore((prevScore) => ({
          ...prevScore,
          player2: prevScore.player2 + 1,
        }));
        setPlayToogle(true);
        setPlay(false);
      } else if (turn === "O") {
        setEndGame("Player 1 wins!!");
        setScore((prevScore) => ({
          ...prevScore,
          player1: prevScore.player1 + 1,
        }));
        setPlayToogle(true);
        setPlay(false);
      }
    } else if (isGridFull(grid)) {
      setEndGame("Draw!!");
      setPlayToogle(true);
      setPlay(false);
    }
  }, [grid]);
  return (
    <main>
      <section className="tictactoe container">
        <TttLeftPanel
          player1={score.player1}
          player2={score.player2}
          handlePlay={handlePlay}
        />
        <TttMiddlePanel
          isPlaying={isPlaying}
          grid={grid}
          player1={player1}
          player2={player2}
          handleBtn={handleBtn}
        />
        <TttRightPanel
          endGame={endGame}
          turn={turn}
          isPlaying={isPlaying}
          player1={player1}
          player2={player2}
        />
      </section>
    </main>
  );
};

export default TicTacToe;
