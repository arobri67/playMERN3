import "./Home.css";
import useAuth from "../../hook/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <main>
      <section className="home container">
        <article className="welcome-msg">
          <h1>
            Welcome to <span>/play</span> {user}
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
