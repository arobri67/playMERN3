import { makepuzzle, solvepuzzle } from "sudoku";
import { useState, useEffect } from "react";
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

  const mockSudoku = [
    6, 7, 5, 1, 8, 4, 0, 3, 2, 3, 4, 2, 7, 6, 0, 5, 1, 8, 8, 1, 0, 7, 2, 5, 7,
    4, 6, 9, 5, 3, 6, 0, 1, 4, 2, 4, 2, 0, 6, 4, 3, 8, 1, 5, 7, 1, 8, 4, 5, 7,
    2, 3, 6, 0, 0, 6, 7, 2, 1, 3, 4, 8, 5, 4, 2, 1, 8, 5, 2, 6, 0, 3, 5, 3, 8,
    0, 4, 5, 2, 7, 1,
  ];

  const mockSudokuSolved = [
    6, 7, 5, 1, 8, 4, 0, 3, 2, 3, 4, 2, 7, 6, 0, 5, 1, 8, 8, 1, 0, 3, 2, 5, 7,
    4, 6, 7, 5, 3, 6, 0, 1, 8, 2, 4, 2, 0, 6, 4, 3, 8, 1, 5, 7, 1, 8, 4, 5, 7,
    2, 3, 6, 0, 0, 6, 7, 2, 1, 3, 4, 8, 5, 4, 2, 1, 8, 5, 7, 6, 0, 3, 5, 3, 8,
    0, 4, 6, 2, 7, 1,
  ];
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
    //const solvedArrayString = mockSudokuSolved.toString();
    console.log(arrayPlayerString === solvedArrayString);
    setWin(arrayPlayerString === solvedArrayString);
  };

  useEffect(() => {
    if (isPlaying) {
      const newBoard = makepuzzle();
      //const newBoard = [...mockSudokuSolved];
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
        <article className="sudoku-play-container">
          <div className="sudoku-play-body">
            <h2>Sudoku</h2>
            {!isPlaying ? (
              <div
                className="btn-action"
                role="button"
                onClick={() => handlePlay()}
              >
                /play
              </div>
            ) : null}

            {isPlaying ? (
              <div
                className="btn-action"
                role="button"
                onClick={() => handleNewGame()}
              >
                New Game
              </div>
            ) : null}
          </div>
        </article>
        <article className="sudoku-board">
          {!isPlaying ? (
            <p>
              Press <span>/play</span> to start a Sudoku
            </p>
          ) : null}
          {sudokuMatrix.map((row, rowIndex) => (
            <div key={rowIndex} className="sudoku-row">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell row${rowIndex}-col${colIndex} ${
                    cell !== null &&
                    cell !== sudokuBoardOriginal[rowIndex * 9 + colIndex]
                      ? "user-added-number"
                      : ""
                  } `}
                  role="button"
                  onClick={() => handleCell(rowIndex, colIndex)}
                >
                  {cell === null ||
                  (cell !== null &&
                    cell !== sudokuBoardOriginal[rowIndex * 9 + colIndex]) ? (
                    selectedCell &&
                    selectedCell.rowIndex === rowIndex &&
                    selectedCell.colIndex === colIndex ? (
                      <select onChange={handleNumber}>
                        <option value="-">-</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                      </select>
                    ) : (
                      cell
                    )
                  ) : (
                    cell
                  )}
                </div>
              ))}
            </div>
          ))}
        </article>
        {isPlaying ? (
          <article className="sudoku-hint-check-container">
            <div className="sudoku-hint-check-body">
              {sudokuBoard.some((number) => number === null) && isPlaying ? (
                <>
                  <p>
                    Hit <span>Hint</span> to get the solution of this Sudoku
                  </p>
                  <div
                    className="btn-action"
                    role="button"
                    onClick={() => handleHint()}
                  >
                    Hint
                  </div>
                </>
              ) : isHint ? (
                <p>
                  Hit <span>New Game</span> to start a new Sudoku
                </p>
              ) : null}

              {sudokuBoard.every((number) => number !== null) &&
              isPlaying &&
              isHint === false ? (
                <>
                  {isWin === null ? (
                    <p>
                      Great! You completed the grid. Hit <span>Check</span> to
                      see if you win!
                    </p>
                  ) : (
                    <p>
                      {isWin
                        ? "Congratulations, you win!!"
                        : "Sorry, you did not find the solution. Keep trying or start a new Sudoku"}
                    </p>
                  )}

                  <div
                    className="btn-action"
                    role="button"
                    onClick={handleCheck}
                  >
                    Check Grid
                  </div>
                </>
              ) : null}
            </div>
          </article>
        ) : (
          <article></article>
        )}
      </section>
    </main>
  );
};

export default Sudoku;
