import React from "react";

const WgRightPanel = ({ gameState, length }) => {
  return (
    <article className="wg-right-container">
      <div className="wg-right-body">
        {gameState === "game over" ? (
          <p className="endgame-msg">You did not guess the word...</p>
        ) : null}
        {gameState === "win" ? (
          <p className="endgame-msg">Congratulation, you guess the word!!</p>
        ) : null}
        <p className="error-msg">
          You have {length} error
          {length > 1 ? "s" : null} (max. 5)
        </p>
      </div>
    </article>
  );
};

export default WgRightPanel;
