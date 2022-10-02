import styles from "./Card.module.scss";
import Button from "components/Button/Button";
import { MouseEventHandler } from "react";

interface Props {
  name: string;
  photo: string;
  isVoter?: boolean;
  onVote: MouseEventHandler<HTMLButtonElement>;
  candidateVoted: boolean;
  votes?: number;
}

const Card = ({
  name,
  photo,
  isVoter = false,
  onVote,
  candidateVoted,
  votes = 0,
}: Props) => {
  console.log(votes);
  return (
    <article className={styles.container}>
      <div className={styles.imgWrapper}>
        <img src={photo} alt={`${name}`} />
      </div>
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        {!candidateVoted && isVoter && (
          <Button
            size="small"
            theme="secondary"
            className={styles.button}
            onClick={onVote}
          >
            Vote
          </Button>
        )}
        {candidateVoted && (
          <p className={styles.voted}>You voted for this candidate</p>
        )}
      </div>
    </article>
  );
};

export default Card;
