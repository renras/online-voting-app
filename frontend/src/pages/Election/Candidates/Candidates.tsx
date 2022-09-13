import styles from "./Candidates.module.scss";
import add from "assets/icons/icon-add.svg";
import { Candidate as CandidateType } from "types/candidate";
import Card from "components/Card/Card";

interface Props {
  title: string;
  onAddCandidateButtonClick: (title: string) => void;
  candidates: CandidateType[];
}

const Candidate = ({ title, onAddCandidateButtonClick, candidates }: Props) => {
  const handleAddCandidate = () => {
    onAddCandidateButtonClick(title);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.heading2}>{title}</h2>
      <div className={styles.content}>
        {candidates.length > 0 &&
          candidates.map((candidate, index) => {
            if (candidate.position === title) {
              return (
                <Card
                  key={index}
                  name={candidate.name}
                  photo={candidate.photo}
                />
              );
            }

            return null;
          })}

        <button
          className={styles.addCandidateButton}
          onClick={handleAddCandidate}
        >
          <img src={add} alt="add candidate" />
          <p>Add {title}</p>
        </button>
      </div>
    </div>
  );
};

export default Candidate;
