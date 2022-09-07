import { createPortal } from "react-dom";
import { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface Props {
  children: ReactNode;
}

const Modal = ({ children }: Props) => {
  return createPortal(
    <div className={styles.modal}>{children}</div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
