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
import AddCandidateForm, {
  FormData as CandidateFormData,
} from "./AddCandidateForm/AddCandidateForm";

const Election = () => {
  const [isAddingPosition, setIsAddingPosition] = useState(false);
  const [positions, setPositions] = useState<PositionFormData[]>([]);
  const [isAddingCandidate, setIsAddingCandidate] = useState(false);

  const handleAddPosition = (data: PositionFormData) => {
    setPositions((prev) => [...prev, data]);
    setIsAddingPosition(false);
  };

  const handleAddCandidate = (data: CandidateFormData) => {
    console.log(data);
    setIsAddingCandidate(false);
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
              <div key={index}>
                <Candidates
                  title={position.title}
                  onAddCandidate={() => setIsAddingCandidate(true)}
                />
                {isAddingCandidate && (
                  <Modal>
                    <AddCandidateForm
                      onClose={() => setIsAddingCandidate(false)}
                      onSubmitForm={handleAddCandidate}
                      position={position.title}
                    />
                  </Modal>
                )}
              </div>
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
    </>
  );
};

export default Election;
