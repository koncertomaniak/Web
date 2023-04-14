import styles from "./Button.module.sass";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  clickHandler: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<ButtonProps> = ({ label, clickHandler }) => {
  return (
    <button className={styles.button} onClick={clickHandler}>
      {label}
    </button>
  );
};

export default Button;
