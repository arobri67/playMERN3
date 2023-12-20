import { Link } from "react-router-dom";
import gameList from "../../../DATA/gameList";
import "./Games.css";

const Games = () => {
  return (
    <main>
      <section className="games container">
        {gameList.map((item) => (
          <article
            key={item.id}
            className="game-card"
            style={{ backgroundImage: `url("/games/${item.link}.png")` }}
          >
            <div className="game-body">
              <h2>{item.name}</h2>
              <div className="play-container">
                <Link to={`/${item.link}`} className="play-btn">
                  /play
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Games;
