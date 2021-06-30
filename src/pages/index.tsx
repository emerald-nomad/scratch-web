import Image from "next/image";
import styles from "styles/Home.module.scss";
import introMobile from "../assets/images/intro-mobile.png";
import logo from "../assets/images/logo.svg";
import { Button, ButtonContainer } from "components";

export default function Home() {
  return (
    <div className={styles["img-container"]}>
      <Image src={logo} />

      <div className={styles["img-container__btns"]}>
        <ButtonContainer>
          <Button text="Login" />
          <Button text="Sign Up" style="outline" />
        </ButtonContainer>
      </div>

      <Image layout="responsive" src={introMobile} />
    </div>
  );
}
