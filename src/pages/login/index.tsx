import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button, Input } from "components";
import logo from "../../assets/images/logo.svg";
import authBanner from "../../assets/images/auth-banner.jpeg";
import styles from "./Login.module.scss";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Image src={logo} alt="Logo" />
        <h1 className={styles["banner__header"]}>Welcome Back!</h1>
        <Image src={authBanner} alt="" />
      </div>

      <section className={styles["content"]}>
        <span className={styles["message"]}>Please login to continue.</span>
        <form>
          <Input
            label="Email"
            message="Forgot Password"
            control={control}
            name="email"
          />

          <Input label="Password" control={control} name="password" />

          <Button text="Login" onClick={handleSubmit(onSubmit)} />
        </form>
      </section>
    </div>
  );
};

export default Login;
