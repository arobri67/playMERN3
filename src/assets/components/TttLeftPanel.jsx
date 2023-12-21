import React from "react";

const TttLeftPanel = ({ player1, player2, handlePlay }) => {
  return (
    <article className="tictactoe-info-container">
      <div className="info-body">
        <h2>Tic Tac Toc</h2>
        <div className="player-score">
          <span className="player1">Player 1</span>: {player1}
        </div>
        <div className="player-score">
          <span className="player2">Player 2</span>: {player2}
        </div>
        <div
          role="button"
          className="play-tic-btn"
          onClick={() => handlePlay()}
        >
          /play
        </div>
      </div>
    </article>
  );
};

export default TttLeftPanel;
