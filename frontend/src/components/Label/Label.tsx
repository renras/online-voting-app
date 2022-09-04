import { ReactNode } from "react";
import styles from "./Label.module.scss";

interface Props {
  htmlFor: string;
  children: ReactNode;
  className?: string;
}

const Label = ({ htmlFor, children, className }: Props) => {
  return (
    <label htmlFor={htmlFor} className={`${styles.label} ${className}`}>
      {children}
    </label>
  );
};

export default Label;
