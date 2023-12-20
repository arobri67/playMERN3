import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hook/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    if (
      credentials.username === "arnaud" &&
      credentials.password === "rtcMERN3"
    ) {
      setUser({ username: credentials.username });
      navigate("/games", { replace: true });
    } else {
      // Handle incorrect credentials
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
