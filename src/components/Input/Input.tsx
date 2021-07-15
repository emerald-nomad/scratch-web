import { Control, Controller } from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps {
  label: string;
  control: Control<any>;
  name: string;
  defaultValue?: string;
  message?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  message,
  error,
  ...inputProps
}) => {
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

      <p>{error}</p>
    </div>
  );
};

export default Input;
