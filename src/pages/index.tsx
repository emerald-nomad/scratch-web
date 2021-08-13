import Image from "next/image";
import styles from "styles/Home.module.scss";
import introMobile from "../assets/images/intro-mobile.png";
import logo from "../assets/images/logo.svg";
import { Button, ButtonContainer } from "components";

export default function Home() {
  return (
    <div className={styles["container"]}>
      <Image src={logo} alt="Logo" />

      <div className={styles["container__content"]}>
        <h1 className={styles.heading}>
          Join over 50 millions people sharing recipes everyday
        </h1>

        <p className={styles["sub-heading"]}>
          Never run out of ideas again. Try new foods, ingredients, cooking
          style, and more
        </p>

        <div className={styles["btns"]}>
          <ButtonContainer>
            <Button text="Login" href="/login" />
            <Button text="Sign Up" href="/signup" style="outline" />
          </ButtonContainer>
        </div>
      </div>

      <Image layout="responsive" src={introMobile} objectFit="cover" />
    </div>
  );
}
