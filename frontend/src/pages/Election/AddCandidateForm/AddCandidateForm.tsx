import { useRef } from "react";
import styles from "./AddPositionForm.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import iconAdd from "assets/icons/icon-add.svg";

const AddCandidateForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className={styles.form}>
      <h1 className={styles.heading}>Add New Candidate</h1>
      <Label htmlFor="name" className={styles.label}>
        Name
      </Label>
      <Input id="name" className={styles.input} />
      <Label htmlFor="Photo" className={styles.label}>
        Add Photo
      </Label>
      <button
        type="button"
        className={styles.imgInput}
        onClick={() => inputRef.current?.click()}
      >
        <img src={iconAdd} alt="add avatar" />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="visuallyHidden"
        />
      </button>
    </form>
  );
};

export default AddCandidateForm;
