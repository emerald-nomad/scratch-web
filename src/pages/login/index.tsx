import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { Button, Input, ScratchImage } from "components";
import logo from "../../assets/images/logo.svg";
import logoNoText from "../../assets/images/logo-no-text.svg";
import authBanner from "../../assets/images/auth-banner.jpeg";
import styles from "styles/Auth.module.scss";
import { LOGIN_USER, setGraphqlErrors } from "lib";
import { useRouter } from "next/router";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const router = useRouter();

  const [loginUser, { loading }] =
    useMutation<{ input: LoginFormData }>(LOGIN_USER);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ resolver: yupResolver(LoginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser({ variables: { input: data } });

      router.push("/feed");
    } catch (error) {
      const { data } = error.graphQLErrors[0];
      setGraphqlErrors({ errors: data, setError });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner} aria-label="Banner">
        <ScratchImage src={logo} alt="Logo" />
        <h1 aria-label="Banner Header" className={styles["banner__header"]}>
          Welcome Back!
        </h1>
        <ScratchImage src={authBanner} alt="Banner Image" />
      </div>

      <section className={styles["content"]}>
        <div className={styles["content__background"]}>
          <ScratchImage src={logoNoText} alt="Logo without text" />
          <ScratchImage src={logo} alt="Logo" />
        </div>
        <h1 className={styles["content__heading"]}>Welcome Back!</h1>
        <span className={styles["message"]}>Please login to continue.</span>
        <form aria-label="Login Form" onSubmit={handleSubmit(onSubmit)}>
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
            type="password"
            error={errors.password?.message}
          />

          <Button text="Login" type="submit" />
        </form>

        <div aria-label="Sign Up Link">
          <p>New to Scratch?</p>
          <Button
            aria-label="Link to Sign Up"
            text="Sign Up!"
            style="text"
            href="/signup"
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
