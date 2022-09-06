import { ReactNode, HTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
  size?: "small" | "large";
}

const Button = ({
  children,
  className,
  fluid,
  size = "large",
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      className={`${styles.button} ${className} ${styles[`fluid-${fluid}`]} ${
        styles[size]
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
