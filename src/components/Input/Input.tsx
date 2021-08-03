import { Control, Controller } from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps {
  label: string;
  control: Control<any>;
  name: string;
  defaultValue?: string;
  message?: string;
  error?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  message,
  error,
  type = "text",
  ...inputProps
}) => {
  const inputName = label.toLowerCase();
  return (
    <div className={styles.container}>
      <div className={styles["container__content"]}>
        <label htmlFor={inputName}>{label}</label>
        {message}
      </div>

      <Controller
        {...inputProps}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            name={inputName}
            aria-label={`${label} input`}
          />
        )}
      />

      <p aria-label={`${label} error message`}>{error}</p>
    </div>
  );
};

export default Input;
