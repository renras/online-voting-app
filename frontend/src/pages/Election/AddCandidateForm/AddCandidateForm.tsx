import { useState, useRef } from "react";
import styles from "./AddCandidateForm.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import iconAdd from "assets/icons/icon-add.svg";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import iconTrash from "assets/icons/icon-trash.svg";

const AddCandidateForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }
  };

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
          <button type="button" className={styles.clearImgPreviewButton}>
            <img src={iconTrash} alt="delete preview" />
          </button>
        </div>
      )}

      <Button
        className={styles.button}
        size="large"
        onClick={() => setImgPreview("")}
      >
        <img src={plusIcon} alt="add position" />
        Add Position
      </Button>
    </form>
  );
};

export default AddCandidateForm;
