const SdkLeftPanel = ({ isPlaying, handleNewGame, handlePlay }) => {
  return (
    <article className="sudoku-left-container">
      <div className="sudoku-left-body">
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
  );
};

export default SdkLeftPanel;
