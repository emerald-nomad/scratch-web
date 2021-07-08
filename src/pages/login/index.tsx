import Image from "next/image";
import logo from "../../assets/images/logo.svg"
import authBanner from "../../assets/images/auth-banner.jpeg";
import styles from "./Login.module.scss"

const Login: React.FC = () => {
  return (
    <>
      <div className={styles.banner}>
        <Image src={logo} alt="Logo" />
        <h1 className={styles['banner__header']}>Welcome Back!</h1>
        <Image src={authBanner} alt="" />
      </div> 

      <section className={styles['banner__content']}>
        <span className={styles['banner__message']}>Please login to continue.</span>
      </section>
    </>
  );
};

export default Login;
