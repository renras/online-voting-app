import { useState } from "react";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Election.module.scss";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import AddPositionForm, { FormData } from "./AddPositionForm/AddPositionForm";
import Modal from "components/Modal/Modal";
import Candidates from "./Candidates/Candidates";
import AddCandidateForm from "./AddCandidateForm/AddCandidateForm";

const Election = () => {
  const [isAddingPosition, setIsAddingPosition] = useState(false);
  const [positions, setPositions] = useState<FormData[]>([]);
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);

  const handleSubmit = (data: FormData) => {
    setPositions((prev) => [...prev, data]);
    setIsAddingPosition(false);
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

          {positions.map((position, index) => (
            <Candidates
              title={position.title}
              key={index}
              onAddCandidate={() => setIsAddingCandidate(true)}
            />
          ))}
        </div>
      </Layout>
      {isAddingPosition && (
        <Modal>
          <AddPositionForm
            onClose={() => setIsAddingPosition(false)}
            onSubmitForm={handleSubmit}
          />
        </Modal>
      )}
      {isAddingCandidate && (
        <Modal>
          <AddCandidateForm onClose={() => setIsAddingCandidate(false)} />
        </Modal>
      )}
    </>
  );
};

export default Election;
