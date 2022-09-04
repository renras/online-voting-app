import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...inputProps }: Props) => {
  return (
    <input
      type="text"
      className={`${styles.input} ${className}`}
      {...inputProps}
    />
  );
};

export default Input;
