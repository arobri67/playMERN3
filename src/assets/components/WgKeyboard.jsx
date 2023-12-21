const WgKeyboard = ({ wrongLetter, handleKeys }) => {
  const alphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  );
  return (
    <article className="keyboard-container">
      <div className="keyboard-body">
        <ul>
          {alphabet.map((item, index) => (
            <li key={index}>
              {wrongLetter.some((letter) => letter === item) ? (
                <div className="btn-wrong-letter"></div>
              ) : (
                <div
                  className="btn-good-letter"
                  role="button"
                  onClick={handleKeys}
                >
                  {item}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default WgKeyboard;
