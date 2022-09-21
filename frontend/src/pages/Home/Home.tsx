import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Home.module.scss";
import Candidates from "components/Candidates/Candidates";
import useCandidates from "hooks/useCandidates";
import usePositions from "hooks/usePositions";
import withAuthentication from "hoc/withAuthentication";

const Home = () => {
  const isLoggedIn = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const {
    candidates,
    isError: isCandidatesError,
    isLoading: isCandidatesLoading,
  } = useCandidates();
  const {
    positions,
    isError: isPositionsError,
    isLoading: isPositionsLoading,
  } = usePositions();

  if (isCandidatesLoading || isPositionsLoading) return <div>Loading...</div>;
  if (isCandidatesError || isPositionsError)
    return <div>There was an error loading the page</div>;

  return (
    <Layout>
      <div className={styles.container}>
        {positions.length > 0 &&
          positions.map((position) => {
            return (
              <Candidates
                key={position.id}
                title={position.name}
                candidates={candidates}
              />
            );
          })}
      </div>
    </Layout>
  );
};

export default withAuthentication(Home);
