import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input } from "components";
import logo from "../../assets/images/logo.svg";
import authBanner from "../../assets/images/auth-banner.jpeg";
import styles from "./Login.module.scss";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(LoginSchema) });

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            message="Forgot Password"
            control={control}
            name="email"
            error={errors.email?.message}
          />

          <Input
            label="Password"
            control={control}
            name="password"
            error={errors.password?.message}
          />

          <Button text="Login" type="submit" />
        </form>

        <div>
          <p>New to Scratch?</p>
          <Button text="Sign Up!" style="text" href="/signup" />
        </div>
      </section>
    </div>
  );
};

export default Login;
