import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Home.module.scss";
import data from "data.json";
import Card from "./Card/Card";

const Home = () => {
  const isLoggedIn = true;
  const navigate = useNavigate();
  const { candidates } = data;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const candidatesForPresident = candidates.filter(
    (candidate) => candidate.position === "President"
  );

  // const candidatesForVicePresident = candidates.filter(
  //   (candidate) => candidate.position === "Vice President"
  // );

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.heading2}>For President</h2>
        <Card name={candidatesForPresident[0].name} />
      </div>
    </Layout>
  );
};

export default Home;
