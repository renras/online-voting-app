import styles from "./Candidates.module.scss";
import add from "assets/icons/icon-add.svg";

interface Props {
  title: string;
}

const Candidate = ({ title }: Props) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading2}>{title}</h2>
      <div className={styles.content}>
        <button className={styles.addCandidateButton}>
          <img src={add} alt="add candidate" />
          <p>Add Candidate</p>
        </button>
      </div>
    </div>
  );
};

export default Candidate;
