import Layout from "components/Layout/DefaultLayout/DefaultLayout";
import styles from "./Election.module.scss";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import AddPositionForm from "./AddPositionForm/AddPositionForm";
import Modal from "components/Modal/Modal";

const Election = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Button size="small" className={styles.button}>
          <img src={plusIcon} alt="plus icon" />
          Add Position
        </Button>
        <Modal>
          <AddPositionForm />
        </Modal>
      </div>
    </Layout>
  );
};

export default Election;
