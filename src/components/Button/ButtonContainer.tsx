import { ReactElement } from "react";
import { ButtonProps } from "./Button";
import styles from "./Button.module.scss";

interface ButtonContainerProps {
  children: ReactElement<ButtonProps>[];
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ children }) => {
  return <div className={styles["btn-container"]}>{children}</div>;
};

export default ButtonContainer;
