import styles from "./Button.module.scss";

export interface ButtonProps {
  text: string;
  style?: "solid" | "outline" | "text";
}

const Button: React.FC<ButtonProps> = ({ text, style = "solid" }) => {
  return (
    <button className={[styles.btn, styles[`btn--${style}`]].join(" ")}>
      {text}
    </button>
  );
};

export default Button;
