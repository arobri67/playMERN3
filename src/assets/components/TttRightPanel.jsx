import React from "react";

const TttRightPanel = ({ endGame, turn, isPlaying, player1, player2 }) => {
  return (
    <article className="tictactoe-turn-container">
      <div className="turn-body">
        {endGame ? (
          <div className="turn-message">
            <span
              className={`${
                endGame == "Player 1 wins!!" ? "player1-turn-color" : ""
              } ${endGame == "Player 2 wins!!" ? "player2-turn-color" : ""}`}
            >
              {endGame}
            </span>
            <span>
              (Click <span className="turn-play">/play</span> to start a new
              game)
            </span>
          </div>
        ) : turn === player1 && isPlaying ? (
          <div className="turn-message">
            <p>
              <span className="player1-turn-color">Player 1's</span> turn!
            </p>
          </div>
        ) : turn === player2 && isPlaying ? (
          <div className="turn-message">
            <p>
              <span className="player2-turn-color">Player 2's</span> turn!
            </p>
          </div>
        ) : (
          <div className="turn-message">
            <p>
              Click <span className="turn-play">/play</span> to start a new game
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

export default TttRightPanel;
