import styles from "./Card.module.scss";
import Button from "components/Button/Button";
import { MouseEventHandler } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import Modal from "components/Modal/Modal";
import { useState } from "react";
import DeleteCandidateForm from "components/Card/DeleteCandidateForm/DeleteCandidateForm";

interface Props {
  id?: number;
  name: string;
  photo: string;
  isVoting?: boolean;
  onVote: MouseEventHandler<HTMLButtonElement>;
  candidateVoted: boolean;
  votes?: number;
  isStillAbleToVote?: boolean;
  rank?: number;
  showResults?: boolean;
  isAdmin?: number;
  isEditable?: boolean;
}

const Card = ({
  id,
  name,
  photo,
  isVoting = false,
  onVote,
  candidateVoted,
  votes = 0,
  isStillAbleToVote = false,
  rank = 0,
  showResults = false,
  isAdmin = 0,
  isEditable = false,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // handles color depending on rank
  const getColorByRank = (rank: number) => {
    switch (rank) {
      case 1:
        return styles.first;
      case 2:
        return styles.second;
      case 3:
        return styles.third;
      default:
        return styles.default;
    }
  };

  const rankToOrdinal = (rank: number) => {
    const j = rank % 10;
    const k = rank % 100;
    if (j === 1 && k !== 11) {
      return rank + "st";
    }
    if (j === 2 && k !== 12) {
      return rank + "nd";
    }
    if (j === 3 && k !== 13) {
      return rank + "rd";
    }
    return rank + "th";
  };

  return (
    <>
      <article className={styles.container}>
        {showResults && <div className={styles.votes}>{votes} Votes</div>}
        {isEditable && isAdmin && (
          <div className={styles.actions}>
            <button>
              <MdModeEditOutline size={24} color="#8575ff" />
            </button>
            <button onClick={() => setIsDeleting(true)}>
              <IoMdTrash size={24} color="#dc3545" />
            </button>
          </div>
        )}
        <div className={styles.imgWrapper}>
          <img src={photo} alt={`${name}`} />
        </div>
        <div className={styles.content}>
          <p className={styles.name}>{name}</p>
          {!candidateVoted && isVoting && isStillAbleToVote && isAdmin === 0 && (
            <Button
              size="small"
              theme="secondary"
              className={styles.button}
              onClick={onVote}
            >
              Vote
            </Button>
          )}

          {showResults && (
            <div className={`${styles.rank} ${getColorByRank(rank)}`}>
              {rankToOrdinal(rank)} Place
            </div>
          )}
          {isVoting && candidateVoted && (
            <p className={styles.voted}>You voted for this candidate</p>
          )}
        </div>
      </article>
      {isDeleting && (
        <Modal>
          <DeleteCandidateForm
            onClose={() => setIsDeleting(false)}
            candidateId={id}
          />
        </Modal>
      )}
    </>
  );
};

export default Card;
