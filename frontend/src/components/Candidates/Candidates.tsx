import styles from "./Candidates.module.scss";
import add from "assets/icons/icon-add.svg";
import { Candidate as CandidateType } from "types/candidate";
import Card from "components/Card/Card";
import axios from "axios";
import { errorToast } from "utils/toast";
import { User } from "types/user";
import { Vote } from "types/vote";
import { useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { Position } from "types/position";

interface Props {
  onAddCandidateButtonClick?: (title: string) => void;
  candidates: CandidateType[];
  isEditable?: boolean;
  position: Position;
  votes?: Vote[];
  isVoting?: boolean;
  showResults?: boolean;
  showTitle?: boolean;
  onUpdatePositionClick?: (position: Position) => void;
}

const Candidate = ({
  onAddCandidateButtonClick,
  candidates,
  isEditable,
  position,
  votes,
  isVoting = false,
  showResults = false,
  showTitle = true,
  onUpdatePositionClick,
}: Props) => {
  const navigate = useNavigate();
  const handleAddCandidate = () => {
    onAddCandidateButtonClick && onAddCandidateButtonClick(position.name);
  };

  const ova_user = JSON.parse(`${localStorage.getItem("ova_user")}`) as User;

  const handleVote = async (candidateId: number, positionId: number) => {
    try {
      await axios.post(`${process.env.REACT_APP_HOST}/votes/`, {
        candidate_id: candidateId,
        position_id: positionId,
        voter_id: ova_user.id,
      });
      navigate(0);
    } catch {
      errorToast("There was an error voting for this candidate");
    }
  };

  const isStillAbleToVote = () => {
    if (votes && votes.length > 0) {
      return !votes?.some(
        (vote) =>
          vote.voter_id === ova_user.id && vote.position_id === position.id
      );
    }

    return true;
  };

  const isCandidateVotedByVoter = (candidateId: number, voterId: number) => {
    if (votes && votes.length > 0) {
      return votes?.some(
        (vote) => vote.voter_id === voterId && vote.candidate_id === candidateId
      );
    }

    return false;
  };

  const getVotes = (candidateId: number) => {
    if (votes && votes.length > 0) {
      return votes?.filter((vote) => vote.candidate_id === candidateId).length;
    }

    return 0;
  };

  const rankCandidateByVotes = (
    candidateA: CandidateType,
    candidateB: CandidateType
  ) => {
    const candidateAVotes = getVotes(candidateA.id);
    const candidateBVotes = getVotes(candidateB.id);

    if (candidateAVotes > candidateBVotes) {
      return -1;
    }

    if (candidateAVotes < candidateBVotes) {
      return 1;
    }

    return 0;
  };

  const sortPositionByVotes = (candidates: CandidateType[]) => {
    // return candidates that matches position id
    const filteredCandidates = candidates.filter(
      (candidate) => candidate.position === position.name
    );

    return filteredCandidates.sort(rankCandidateByVotes);
  };

  const getCandidateRank = (candidateId: number) => {
    const sortedCandidates = sortPositionByVotes(candidates);
    const candidateIndex = sortedCandidates.findIndex(
      (candidate) => candidate.id === candidateId
    );

    return candidateIndex + 1;
  };

  return (
    <div className={styles.container}>
      {showTitle && (
        <div className={styles.headingContainer}>
          <h2 className={styles.heading2}>{position.name}</h2>
          <button
            onClick={() =>
              onUpdatePositionClick && onUpdatePositionClick(position)
            }
          >
            <MdModeEditOutline size={24} color="#8575ff" />
          </button>
        </div>
      )}
      <div className={styles.content}>
        {candidates.length > 0 &&
          candidates.map((candidate, index) => {
            if (candidate.position === position.name) {
              return (
                <Card
                  key={index}
                  name={candidate.name}
                  photo={candidate.photo}
                  isVoting={isVoting}
                  rank={getCandidateRank(candidate.id)}
                  isStillAbleToVote={isStillAbleToVote()}
                  votes={getVotes(candidate.id)}
                  onVote={() => handleVote(candidate.id, position.id)}
                  showResults={showResults}
                  candidateVoted={isCandidateVotedByVoter(
                    candidate.id,
                    ova_user.id
                  )}
                  isAdmin={ova_user.is_admin}
                />
              );
            }

            return null;
          })}

        {isEditable && (
          <button
            className={styles.addCandidateButton}
            onClick={handleAddCandidate}
          >
            <img src={add} alt="add candidate" />
            <p>Add {position.name}</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Candidate;
