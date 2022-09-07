import { InputHTMLAttributes, LegacyRef, forwardRef } from "react";
import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const _Input = (
  { className, ...inputProps }: Props,
  ref: LegacyRef<HTMLInputElement>
) => {
  return (
    <input
      ref={ref}
      type="text"
      className={`${styles.input} ${className}`}
      {...inputProps}
    />
  );
};

const Input = forwardRef(_Input);

export default Input;
