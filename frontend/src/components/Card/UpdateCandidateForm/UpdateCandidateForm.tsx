import { useState, useRef } from "react";
import styles from "./UpdateCandidateForm.module.scss";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import iconAdd from "assets/icons/icon-add.svg";
import Button from "components/Button/Button";
import plusIcon from "assets/icons/icon-plus.svg";
import iconTrash from "assets/icons/icon-trash.svg";
import closeIcon from "assets/icons/icon-close.svg";
import { MouseEventHandler } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorToast, successToast } from "utils/toast";
import { useNavigate } from "react-router-dom";

export interface CandidateFormData {
  name: string;
  photo: string;
}

interface Props {
  id?: number;
  onClose: MouseEventHandler<HTMLButtonElement>;
  positionId?: number;
  name: string;
  photo: string;
}

const UpdateCandidateForm = ({
  onClose,
  positionId,
  id,
  name,
  photo,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit } = useForm<CandidateFormData>();
  const navigate = useNavigate();

  // add candidate form submit handler
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!file) {
        await axios.put(`${process.env.REACT_APP_HOST}/candidates/`, {
          id: id,
          name: data.name,
          photo: photo,
          position: positionId,
        });
        navigate(0);

        return;
      }

      successToast("Image may take a while to upload...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "o2xlly6v");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dliwmso9q/image/upload",
        formData
      );

      await axios.put(`${process.env.REACT_APP_HOST}/candidates/`, {
        id: id,
        name: data.name,
        photo: response.data.url,
        position: positionId,
      });
      navigate(0);
    } catch {
      errorToast("Failed to add user. Please try again.");
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleClearImgPreview = () => {
    setImgPreview("");
    setFile(null);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.heading}>Update Candidate</h1>
      <Label htmlFor="name" className={styles.label}>
        Name
      </Label>
      <Input
        id="name"
        className={styles.input}
        {...register("name", { required: true })}
        defaultValue={name}
      />
      <Label htmlFor="Photo" className={styles.label}>
        Photo
      </Label>

      {!imgPreview && (
        <button
          type="button"
          className={styles.imgInput}
          onClick={() => inputRef.current?.click()}
        >
          <img
            src={photo || iconAdd}
            alt="add avatar"
            className={styles.defaultImg}
          />
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
            onClick={() => handleClearImgPreview()}
          >
            <img src={iconTrash} alt="delete preview" />
          </button>
        </div>
      )}

      <Button className={styles.button} size="large">
        <img src={plusIcon} alt="add candidate" />
        Update Candidate
      </Button>
      <button className={styles.closeButton} type="button" onClick={onClose}>
        <img src={closeIcon} alt="close form" className={styles.icon} />
      </button>
    </form>
  );
};

export default UpdateCandidateForm;
