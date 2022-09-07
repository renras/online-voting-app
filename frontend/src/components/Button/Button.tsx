import { ReactNode, HTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
  size?: "small" | "large";
  theme?: "primary" | "secondary";
}

const Button = ({
  children,
  className,
  fluid,
  theme = "primary",
  size = "small",
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      className={`${styles.button} ${styles[`fluid-${fluid}`]} ${styles[size]}
      ${styles[theme]}
      ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
