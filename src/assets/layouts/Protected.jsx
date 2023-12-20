import { useOutlet, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";
import useAuth from "../hook/useAuth";

const Protected = () => {
  const outlet = useOutlet();
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  return (
    <>
      <NavBar
        pages={[{ label: "Games", path: "/games" }]}
        logoutLabel={"Log out"}
      />
      {outlet}
      <FooterBar />
    </>
  );
};

export default Protected;
