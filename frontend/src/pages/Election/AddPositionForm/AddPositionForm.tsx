import Input from "components/Input/Input";
import styles from "./AddPositionForm.module.scss";
import Label from "components/Label/Label";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import closeIcon from "assets/icons/icon-close.svg";
import { MouseEventHandler } from "react";
import { useForm } from "react-hook-form";

interface Props {
  onClose: MouseEventHandler<HTMLButtonElement>;
  onSubmitForm: (data: FormData) => void;
}

export interface FormData {
  title: string;
}

const AddPositionForm = ({ onClose, onSubmitForm }: Props) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => onSubmitForm(data));

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.heading}>Add New Position</h1>
      <Label htmlFor="title" className={styles.label}>
        Title
      </Label>
      <Input
        id="title"
        className={styles.input}
        {...register("title", { required: true })}
      />
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
