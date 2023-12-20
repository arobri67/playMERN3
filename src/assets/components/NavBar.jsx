import { NavLink } from "react-router-dom";
import useAuth from "../hook/useAuth";

const NavBar = ({ pages, logoutLabel }) => {
  const { logout, user } = useAuth();
  return (
    <header className="container">
      <nav>
        <div>
          <h2 className="logo">
            <span>/play</span> : gamehub
          </h2>
        </div>
        <div className="action-btn">
          {pages?.map((page) => (
            <NavLink
              to={page.path}
              key={page.label}
              className="nav-link"
              activeclassname="active"
            >
              {page.label}
            </NavLink>
          ))}
          {user !== null ? (
            <NavLink
              onClick={logout}
              className="nav-link"
              activeclassname="active"
            >
              Log out
            </NavLink>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
