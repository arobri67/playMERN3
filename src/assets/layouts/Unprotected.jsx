import { useOutlet, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuth from "../hook/useAuth";
import FooterBar from "../components/FooterBar";

const Unprotected = () => {
  const outlet = useOutlet();
  const { user } = useAuth();
  if (user) return <Navigate to="games" replace />;
  return (
    <>
      <NavBar
        pages={[
          { label: "Home", path: "/" },
          { label: "Log in", path: "login" },
        ]}
      />
      {outlet}
      <FooterBar />
    </>
  );
};

export default Unprotected;
