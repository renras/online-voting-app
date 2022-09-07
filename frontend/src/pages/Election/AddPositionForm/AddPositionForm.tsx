import Input from "components/Input/Input";
import styles from "./AddPositionForm.module.scss";
import Label from "components/Label/Label";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import closeIcon from "assets/icons/icon-close.svg";
import { MouseEventHandler } from "react";

interface Props {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const AddPositionForm = ({ onClose }: Props) => {
  return (
    <form className={styles.form}>
      <h1 className={styles.heading}>Add New Position</h1>
      <Label htmlFor="title" className={styles.label}>
        Title
      </Label>
      <Input id="title" className={styles.input} />
      <Button className={styles.button} size="large">
        <img src={plusIcon} alt="plus icon" />
        Add Position
      </Button>
      <button className={styles.closeButton} type="button" onClick={onClose}>
        <img src={closeIcon} alt="close form" className={styles.icon} />
      </button>
    </form>
  );
};

export default AddPositionForm;
