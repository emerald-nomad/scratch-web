import { Control, Controller } from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps {
  label: string;
  control: Control<any>;
  name: string;
  defaultValue?: string;

  message?: string;
}

const Input: React.FC<InputProps> = ({ label, message, ...inputProps }) => {
  return (
    <div className={styles.container}>
      <div className={styles["container__content"]}>
        <label>{label}</label>
        {message}
      </div>

      <Controller
        {...inputProps}
        render={({ field }) => <input {...field} />}
      />
    </div>
  );
};

export default Input;
