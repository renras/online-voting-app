import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Home.module.scss";
import data from "data";
import Card from "../../components/Card/Card";

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

  const candidatesForVicePresident = candidates.filter(
    (candidate) => candidate.position === "Vice President"
  );

  return (
    <Layout>
      <div className={styles.container}>
        <h2 className={styles.heading2}>For President</h2>
        <div className={styles.candidates}>
          {candidatesForPresident.map((candidate) => (
            <Card
              key={candidate.id}
              name={candidate.name}
              photo={candidate.image}
            />
          ))}
        </div>
        <h2 className={styles.heading2}>For Vice President</h2>
        <div className={styles.candidates}>
          {candidatesForVicePresident.map((candidate) => (
            <Card
              key={candidate.id}
              name={candidate.name}
              photo={candidate.image}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
