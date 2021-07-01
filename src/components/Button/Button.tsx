import Link from "next/link";
import styles from "./Button.module.scss";

export interface ButtonProps {
  text: string;
  style?: "solid" | "outline" | "text";
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ text, style = "solid", href }) => {
  const Btn = (
    <button className={[styles.btn, styles[`btn--${style}`]].join(" ")}>
      {text}
    </button>
  );

  return href ? <Link href={href}>{Btn}</Link> : Btn;
};

export default Button;
