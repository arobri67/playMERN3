const WgLeftPanel = ({ isPlaying, wrongLetter, handlePlay }) => {
  return (
    <article className="wg-left-container">
      <div className="wg-left-body">
        <h2>Word Guess</h2>
        {isPlaying ? (
          <>
            <h3>Wrong letters</h3>
            <ul>
              {wrongLetter.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        ) : null}
        <div role="button" className="play-wg-btn" onClick={() => handlePlay()}>
          /play
        </div>
      </div>
    </article>
  );
};

export default WgLeftPanel;
