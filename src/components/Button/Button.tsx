import Link from "next/link";
import styles from "./Button.module.scss";

export interface ButtonProps {
  text: string;
  style?: "solid" | "outline" | "text";
  href?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  style = "solid",
  href,
  onClick,
}) => {
  const Btn = (
    <button
      onClick={onClick}
      className={[styles.btn, styles[`btn--${style}`]].join(" ")}
    >
      {text}
    </button>
  );

  return href ? <Link href={href}>{Btn}</Link> : Btn;
};

export default Button;
