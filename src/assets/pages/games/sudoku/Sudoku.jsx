import { makepuzzle, solvepuzzle } from "sudoku";
import { useState, useEffect } from "react";
import SdkLeftPanel from "../../../components/SdkLeftPanel";
import SdkMiddlePanel from "../../../components/SdkMiddlePanel";
import SdkRightPanel from "../../../components/SdkRightPanel";
import "./Sudoku.css";

const Sudoku = () => {
  const [isPlaying, setPlay] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [sudokuBoardOriginal, setSudokuBoardOriginal] = useState([]);
  const [sudokuBoardSolved, setSudokuBoardSolved] = useState([]);
  const [sudokuMatrix, setSudokuMatrix] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isHint, setHint] = useState(false);
  const [isWin, setWin] = useState(null);

  const handleHint = () => {
    setHint(true);
    const solvedArrayString = solvepuzzle(sudokuBoardOriginal);
    const matrix = [];
    for (let i = 0; i < 9; i++) {
      matrix.push(solvedArrayString.slice(i * 9, (i + 1) * 9));
    }
    setSudokuMatrix(matrix);
  };

  const handlePlay = () => {
    setPlay(true);
    setHint(false);
  };
  const handleNewGame = () => {
    setNewGame(!newGame);
    setHint(false);
    setWin(null);
  };
  const handleCell = (rowIndex, colIndex) => {
    const cellValue = sudokuMatrix[rowIndex][colIndex];
    const originalValue = sudokuBoardOriginal[rowIndex * 9 + colIndex];

    if (cellValue === null) {
      setSelectedCell({ rowIndex, colIndex });
    } else if (cellValue && originalValue === null) {
      setSelectedCell({ rowIndex, colIndex });
    } else setSelectedCell(null);
  };

  const handleNumber = (e) => {
    const value = e.target.value;
    const matrixTemp = [...sudokuMatrix];
    matrixTemp[selectedCell.rowIndex][selectedCell.colIndex] = Number(value);
    setSudokuMatrix(matrixTemp);
  };

  const handleCheck = () => {
    const arrayPlayerString = sudokuBoard.toString();
    const solvedArrayString = sudokuBoardSolved.toString();
    console.log(arrayPlayerString === solvedArrayString);
    setWin(arrayPlayerString === solvedArrayString);
  };

  useEffect(() => {
    if (isPlaying) {
      const newBoard = makepuzzle();
      const matrix = [];
      setSudokuBoard(newBoard);
      setSudokuBoardOriginal(newBoard);
      for (let i = 0; i < 9; i++) {
        matrix.push(newBoard.slice(i * 9, (i + 1) * 9));
      }
      setSudokuMatrix(matrix);
      setSudokuBoardSolved(solvepuzzle(newBoard));
    }
  }, [isPlaying, newGame]);

  useEffect(() => {
    if (isPlaying) {
      setSudokuBoard([].concat(...sudokuMatrix));
    }
  }, [sudokuMatrix]);

  return (
    <main>
      <section className="sudoku container">
        <SdkLeftPanel
          isPlaying={isPlaying}
          handlePlay={handlePlay}
          handleNewGame={handleNewGame}
        />
        <SdkMiddlePanel
          isPlaying={isPlaying}
          sudokuMatrix={sudokuMatrix}
          sudokuBoardOriginal={sudokuBoardOriginal}
          handleCell={handleCell}
          selectedCell={selectedCell}
          handleNumber={handleNumber}
        />
        <SdkRightPanel
          isPlaying={isPlaying}
          sudokuBoard={sudokuBoard}
          handleHint={handleHint}
          isHint={isHint}
          isWin={isWin}
          handleCheck={handleCheck}
        />
      </section>
    </main>
  );
};

export default Sudoku;
