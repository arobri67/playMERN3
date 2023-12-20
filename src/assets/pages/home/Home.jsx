import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <main>
      <section className="home container">
        <article className="welcome-msg">
          <h1>
            Welcome to <span>/play</span>
          </h1>
          <p>
            Please <span>log in</span> to access to our games.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Home;
