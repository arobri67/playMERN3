import React from "react";

const TttMiddlePanel = ({ isPlaying, player1, player2, grid, handleBtn }) => {
  return (
    <article className="tictactoe-board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="tictactoe-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              role="button"
              className={`tictactoe-cell ${
                cell === player1 ? "player1-color" : ""
              } ${cell === player2 ? "player2-color" : ""} ${
                isPlaying ? "hoverable" : ""
              }`}
              onClick={() => handleBtn(rowIndex, colIndex, cell)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </article>
  );
};

export default TttMiddlePanel;
