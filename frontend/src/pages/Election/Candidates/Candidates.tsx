import styles from "./Candidates.module.scss";
import add from "assets/icons/icon-add.svg";
import { MouseEventHandler } from "react";

interface Props {
  title: string;
  onAddCandidate: MouseEventHandler<HTMLButtonElement>;
}

const Candidate = ({ title, onAddCandidate }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading2}>{title}</h2>
      <div className={styles.content}>
        <button className={styles.addCandidateButton} onClick={onAddCandidate}>
          <img src={add} alt="add candidate" />
          <p>Add Candidate</p>
        </button>
      </div>
    </div>
  );
};

export default Candidate;
