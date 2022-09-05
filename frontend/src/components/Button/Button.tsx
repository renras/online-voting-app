import { ReactNode, HTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
}

const Button = ({ children, className, fluid, ...buttonProps }: Props) => {
  return (
    <button
      {...buttonProps}
      className={`${styles.button} ${className} ${styles[`fluid-${fluid}`]}`}
    >
      {children}
    </button>
  );
};

export default Button;
