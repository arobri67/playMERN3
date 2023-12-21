import React from "react";

const SdkMiddlePanel = ({
  isPlaying,
  sudokuMatrix,
  sudokuBoardOriginal,
  handleCell,
  selectedCell,
  handleNumber,
}) => {
  return (
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
  );
};

export default SdkMiddlePanel;
