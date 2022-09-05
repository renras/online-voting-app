import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "components/Drawer/Drawer";

const Home = () => {
  const isLoggedIn = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <Drawer />
    </div>
  );
};

export default Home;
