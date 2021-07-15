import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps {
  text: string;
  style?: "solid" | "outline" | "text";
  href?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button: React.FC<ButtonProps> = ({
  text,
  style = "solid",
  href,
  type = "button",
  onClick,
}) => {
  const Btn = (
    <button
      onClick={onClick}
      className={[styles.btn, styles[`btn--${style}`]].join(" ")}
      type={type}
    >
      {text}
    </button>
  );

  return href ? <Link href={href}>{Btn}</Link> : Btn;
};

export default Button;
