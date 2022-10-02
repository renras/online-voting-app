import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import usePositions from "../../hooks/usePositions";
import useCandidates from "../../hooks/useCandidates";
import Candidates from "components/Candidates/Candidates";
import useVotes from "hooks/useVotes";
import styles from "./Results.module.scss";

const Results = () => {
  const {
    positions,
    isError: isPositionsError,
    isLoading: isPositionsLoading,
  } = usePositions();
  const {
    candidates,
    isError: isCandidatesError,
    isLoading: isCandidatesLoading,
  } = useCandidates();
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
        {positions.length > 0 &&
          positions.map((position) => {
            return (
              <Candidates
                key={position.id}
                positionId={position.id}
                title={position.name}
                candidates={candidates}
                isVoting={false}
                votes={votes}
                showResults
              />
            );
          })}
      </div>
    </Layout>
  );
};

export default Results;
