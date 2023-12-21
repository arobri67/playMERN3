const WgMidPanel = ({ isPlaying, gameState, wordArray }) => {
  return (
    <>
      {gameState !== "off" ? (
        <article className="wg-middle-container">
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
        <article className="wg-middle-message">
          <p>
            Hit <span>/play</span> to start a new game!
          </p>
        </article>
      )}
    </>
  );
};

export default WgMidPanel;
