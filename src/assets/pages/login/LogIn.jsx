import "./LogIn.css";
import { useState } from "react";
import useAuth from "../../hook/useAuth";

const LogIn = () => {
  const [user, setUser] = useState("");
  const { login } = useAuth();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  };
  return (
    <main>
      <section className="login container">
        <article className="login-card">
          <div className="login-body">
            <h2>
              Log in to <span>/play</span>
            </h2>
            <form onSubmit={handleSubmit} className="inputs" noValidate>
              <label htmlFor="username"></label>
              <input
                type="username"
                name="username"
                id="username"
                required
                value={user?.name} //why this?
                placeholder="Username"
                onChange={handleInput}
              />
              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Password"
                onChange={handleInput}
              />
              <button className="login-btn">Log In</button>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
};

export default LogIn;
