import { useState } from "react";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Election.module.scss";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import AddPositionForm from "./AddPositionForm/AddPositionForm";
import Modal from "components/Modal/Modal";
import Candidates from "../../components/Candidates/Candidates";
import AddCandidateForm from "./AddCandidateForm/AddCandidateForm";
import usePositions from "../../hooks/usePositions";
import useCandidates from "../../hooks/useCandidates";

const Election = () => {
  const [isAddingPosition, setIsAddingPosition] = useState(false);
  const [activePosition, setActivePosition] = useState<string | null>("");

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

  if (isPositionsLoading || isCandidatesLoading) return <div>Loading...</div>;
  if (isPositionsError || isCandidatesError)
    return <div>There was an error loading the page</div>;

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

          {positions.length > 0 &&
            positions.map((position) => {
              return (
                <Candidates
                  key={position.id}
                  positionId={position.id}
                  title={position.name}
                  candidates={candidates}
                  onAddCandidateButtonClick={(title) =>
                    setActivePosition(title)
                  }
                  isEditable
                />
              );
            })}
        </div>
      </Layout>
      {isAddingPosition && (
        <Modal>
          <AddPositionForm onClose={() => setIsAddingPosition(false)} />
        </Modal>
      )}
      {activePosition && (
        <Modal>
          <AddCandidateForm
            onClose={() => setActivePosition(null)}
            position={activePosition}
          />
        </Modal>
      )}
    </>
  );
};

export default Election;
