import { ReactNode, HTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...buttonProps }: Props) => {
  return (
    <button {...buttonProps} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
