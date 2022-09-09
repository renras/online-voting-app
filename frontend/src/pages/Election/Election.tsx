import { useState } from "react";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Election.module.scss";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import AddPositionForm, {
  FormData as PositionFormData,
} from "./AddPositionForm/AddPositionForm";
import Modal from "components/Modal/Modal";
import Candidates from "./Candidates/Candidates";
import AddCandidateForm from "./AddCandidateForm/AddCandidateForm";
import { Candidate } from "types/candidate";

const Election = () => {
  const [isAddingPosition, setIsAddingPosition] = useState(false);
  const [positions, setPositions] = useState<PositionFormData[]>([]);
  const [activePosition, setActivePosition] = useState<string | null>("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleAddPosition = (data: PositionFormData) => {
    setPositions((prev) => [...prev, data]);
    setIsAddingPosition(false);
  };

  const handleAddCandidate = (data: Candidate) => {
    setCandidates((prev) => [...prev, data]);
    setActivePosition(null);
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <Button
            size="small"
            className={styles.button}
            onClick={() => setIsAddingPosition(true)}
          >
            <img src={plusIcon} alt="plus icon" />
            Add Position
          </Button>

          {positions.map((position, index) => {
            return (
              <Candidates
                key={index}
                title={position.title}
                candidates={candidates}
                onAddCandidateButtonClick={(title) => setActivePosition(title)}
              />
            );
          })}
        </div>
      </Layout>
      {isAddingPosition && (
        <Modal>
          <AddPositionForm
            onClose={() => setIsAddingPosition(false)}
            onSubmitForm={handleAddPosition}
          />
        </Modal>
      )}
      {activePosition && (
        <Modal>
          <AddCandidateForm
            onClose={() => setActivePosition(null)}
            onSubmitForm={handleAddCandidate}
            position={activePosition}
          />
        </Modal>
      )}
    </>
  );
};

export default Election;
