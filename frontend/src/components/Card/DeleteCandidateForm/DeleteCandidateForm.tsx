import styles from "./DeleteCandidateForm.module.scss";
import Button from "components/Button/Button";
import closeIcon from "assets/icons/icon-close.svg";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast } from "utils/toast";
import axios from "axios";

interface Props {
	onClose: MouseEventHandler<HTMLButtonElement>;
	candidateId?: number;
}

const DeleteCandidateForm = ({ onClose, candidateId }: Props) => {
	const navigate = useNavigate();

	const handleDelete = async () => {
		try {
			const data = JSON.stringify({
				id: candidateId,
			});

			const config = {
				method: "delete",
				url: `${process.env.REACT_APP_HOST}/candidates/`,
				headers: {
					"Content-Type": "application/json",
				},
				data: data,
			};

			await axios(config);
			navigate(0);
		} catch {
			errorToast("Failed to delete candidate. Please try again later.");
		}
	};

	return (
		<div className={styles.form}>
			<h1 className={styles.heading}>
				Are you sure you want to remove this candidate?
			</h1>
			<Button
				className={styles.button}
				size="large"
				onClick={() => handleDelete()}
			>
				Delete Candidate
			</Button>
			<button className={styles.closeButton} type="button" onClick={onClose}>
				<img src={closeIcon} alt="close form" className={styles.icon} />
			</button>
		</div>
	);
};

export default DeleteCandidateForm;
