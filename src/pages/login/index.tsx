import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input } from "components";
import logo from "../../assets/images/logo.svg";
import authBanner from "../../assets/images/auth-banner.jpeg";
import styles from "styles/Auth.module.scss";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
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
            label="Username"
            message="Forgot Password"
            control={control}
            name="username"
            error={errors.username?.message}
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
