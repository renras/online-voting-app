import { useState } from "react";
import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Election.module.scss";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import AddPositionForm from "./AddPositionForm/AddPositionForm";
import Modal from "components/Modal/Modal";

const Election = () => {
  const [isAddingPosition, setIsAddingPosition] = useState(false);

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
        </div>
      </Layout>
      {isAddingPosition && (
        <Modal>
          <AddPositionForm onClose={() => setIsAddingPosition(false)} />
        </Modal>
      )}
    </>
  );
};

export default Election;
