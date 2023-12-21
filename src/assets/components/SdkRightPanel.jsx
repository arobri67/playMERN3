const SdkRightPanel = ({
  isPlaying,
  sudokuBoard,
  handleHint,
  isHint,
  isWin,
  handleCheck,
}) => {
  return (
    <>
      {isPlaying ? (
        <article className="sudoku-right-container">
          <div className="sudoku-right-body">
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
                    Great! You completed the grid. Hit <span>Check</span> to see
                    if you win!
                  </p>
                ) : (
                  <p>
                    {isWin
                      ? "Congratulations, you win!!"
                      : "Sorry, you did not find the solution. Keep trying or start a new Sudoku"}
                  </p>
                )}

                <div className="btn-action" role="button" onClick={handleCheck}>
                  Check Grid
                </div>
              </>
            ) : null}
          </div>
        </article>
      ) : (
        <article></article>
      )}
    </>
  );
};

export default SdkRightPanel;
