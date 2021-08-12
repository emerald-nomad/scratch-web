import { LoadingIndicator } from "components/LoadingIndicator";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps {
  text: string;
  style?: "solid" | "outline" | "text";
  href?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  "aria-label"?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  style = "solid",
  href,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
  loading = false,
}) => {
  const Btn = (
    <button
      onClick={onClick}
      className={[styles.btn, styles[`btn--${style}`]].join(" ")}
      type={type}
      aria-label={ariaLabel}
    >
      {loading ? <LoadingIndicator /> : text}
    </button>
  );

  return href ? <Link href={href}>{Btn}</Link> : Btn;
};

export default Button;
