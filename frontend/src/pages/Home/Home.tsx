import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Home.module.scss";
import Candidates from "components/Candidates/Candidates";
import useCandidates from "hooks/useCandidates";
import usePositions from "hooks/usePositions";
import useVotes from "hooks/useVotes";
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
  const {
    votes,
    isError: isVotesError,
    isLoading: isVotesLoading,
  } = useVotes();

  if (isCandidatesLoading || isPositionsLoading || isVotesLoading)
    return <div>Loading...</div>;
  if (isCandidatesError || isPositionsError || isVotesError)
    return <div>There was an error loading the page</div>;

  return (
    <Layout>
      <div className={styles.container}>
        {!(candidates.length > 0) && (
          <h2 className={styles.heading2}>No candidates added...</h2>
        )}

        {candidates.length > 0 &&
          positions.map((position) => {
            return (
              <Candidates
                key={position.id}
                positionId={position.id}
                title={position.name}
                candidates={candidates}
                votes={votes}
                isVoting
              />
            );
          })}
      </div>
    </Layout>
  );
};

export default withAuthentication(Home);
