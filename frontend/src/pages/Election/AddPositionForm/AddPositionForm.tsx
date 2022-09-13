import Input from "components/Input/Input";
import styles from "./AddPositionForm.module.scss";
import Label from "components/Label/Label";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import closeIcon from "assets/icons/icon-close.svg";
import { MouseEventHandler } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorToast } from "utils/toast";

interface Props {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export interface FormData {
  name: string;
}

const AddPositionForm = ({ onClose }: Props) => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_HOST}/positions/`, data);
      navigate(0);
    } catch {
      errorToast("Failed to add position");
    }
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.heading}>Add New Position</h1>
      <Label htmlFor="title" className={styles.label}>
        Title
      </Label>
      <Input
        id="title"
        className={styles.input}
        {...register("name", { required: true })}
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
