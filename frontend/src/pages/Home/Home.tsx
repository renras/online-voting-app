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
        {positions.map((position) => {
          const filteredCandidates = candidates.filter(
            (candidate) => candidate.position === position.id
          );

          return (
            <Candidates
              key={position.id}
              position={position}
              candidates={filteredCandidates}
              votes={votes}
              isVoting
              showTitle={filteredCandidates.length > 0}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default withAuthentication(Home);
