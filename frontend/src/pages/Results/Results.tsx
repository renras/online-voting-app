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
        {positions.map((position) => {
          const filteredCandidates = candidates.filter(
            (candidate) => candidate.position === position.name
          );

          return (
            <Candidates
              key={position.id}
              position={position}
              candidates={filteredCandidates}
              isVoting={false}
              votes={votes}
              showResults
              showTitle={filteredCandidates.length > 0}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Results;
