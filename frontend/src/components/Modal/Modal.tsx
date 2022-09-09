import { createPortal } from "react-dom";
import { ReactNode } from "react";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

interface Props {
  children: ReactNode;
}

const Modal = ({ children }: Props) => {
  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "unset";
    };
  }, []);

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>{children}</div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
