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
import UpdatePositionForm from "./UpdatePositionForm/UpdatePositionForm";
import { Position } from "types/position";

const Election = () => {
  const [isAddingPosition, setIsAddingPosition] = useState(false);
  const [activePosition, setActivePosition] = useState<string | null>("");
  const [updatePositionId, setUpdatePositionId] = useState<number | null>(null);

  // fetch positions
  const {
    positions,
    isError: isPositionsError,
    isLoading: isPositionsLoading,
  } = usePositions();

  // fetch candidates
  const {
    candidates,
    isError: isCandidatesError,
    isLoading: isCandidatesLoading,
  } = useCandidates();

  if (isPositionsLoading || isCandidatesLoading) return <div>Loading...</div>;
  if (isPositionsError || isCandidatesError)
    return <div>There was an error loading the page</div>;

  const handleUpdatePosition = (position: Position) => {
    setUpdatePositionId(position.id);
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

          {positions.length > 0 &&
            positions.map((position) => {
              return (
                <Candidates
                  key={position.id}
                  position={position}
                  candidates={candidates}
                  onAddCandidateButtonClick={(title) =>
                    setActivePosition(title)
                  }
                  isEditable
                  onUpdatePositionClick={handleUpdatePosition}
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
      {updatePositionId && (
        <Modal>
          <UpdatePositionForm
            onClose={() => setUpdatePositionId(null)}
            position={positions.find(
              (position) => position.id === updatePositionId
            )}
          />
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
