import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";

const Home = () => {
  const isLoggedIn = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <Layout>hello</Layout>;
};

export default Home;
