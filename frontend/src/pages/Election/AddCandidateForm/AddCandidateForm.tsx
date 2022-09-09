import { useState, useRef } from "react";
import styles from "./AddCandidateForm.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import iconAdd from "assets/icons/icon-add.svg";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import iconTrash from "assets/icons/icon-trash.svg";
import closeIcon from "assets/icons/icon-close.svg";
import { MouseEventHandler } from "react";
import { useForm } from "react-hook-form";

export interface FormData {
  name: string;
  photo: string;
  position: string;
}

interface Props {
  onClose: MouseEventHandler<HTMLButtonElement>;
  onSubmitForm: (data: FormData) => void;
  position: string;
}

const AddCandidateForm = ({ onClose, onSubmitForm, position }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState("");
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    if (!imgPreview) return;

    onSubmitForm({
      name: data.name,
      photo: imgPreview,
      position: position,
    });
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.heading}>Add New Candidate</h1>
      <Label htmlFor="name" className={styles.label}>
        Name
      </Label>
      <Input
        id="name"
        className={styles.input}
        {...register("name", { required: true })}
      />
      <Label htmlFor="Photo" className={styles.label}>
        Add Photo
      </Label>

      {!imgPreview && (
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
            onChange={handleFileChange}
          />
        </button>
      )}

      {imgPreview && (
        <div className={styles.imgPreviewContainer}>
          <img src={imgPreview} alt="preview" className={styles.imgPreview} />
          <button
            type="button"
            className={styles.clearImgPreviewButton}
            onClick={() => setImgPreview("")}
          >
            <img src={iconTrash} alt="delete preview" />
          </button>
        </div>
      )}

      <Button className={styles.button} size="large">
        <img src={plusIcon} alt="add position" />
        Add Position
      </Button>
      <button className={styles.closeButton} type="button" onClick={onClose}>
        <img src={closeIcon} alt="close form" className={styles.icon} />
      </button>
    </form>
  );
};

export default AddCandidateForm;
