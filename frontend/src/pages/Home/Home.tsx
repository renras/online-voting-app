import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Home.module.scss";

const Home = () => {
  const isLoggedIn = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.heading2}>For President</h2>
      </div>
    </Layout>
  );
};

export default Home;
