import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Input } from "components";
import logo from "../../assets/images/logo.svg";
import authBanner from "../../assets/images/auth-banner.jpeg";
import styles from "styles/Auth.module.scss";

interface SignUpFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
});

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: yupResolver(SignUpSchema) });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Image src={logo} alt="Logo" />
        <h1 className={styles["banner__header"]}>
          Start <br /> from Scratch!
        </h1>
        <Image src={authBanner} alt="" />
      </div>

      <section className={styles["content"]}>
        <span className={styles["message"]}>Create account to continue.</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Username"
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

          <Input
            label="Confirm Password"
            control={control}
            name="confirmPassword"
            error={errors.confirmPassword?.message}
          />

          <Button text="Sign Up" type="submit" />
        </form>

        <div>
          <p>Already have an account?</p>
          <Button text="Login!" style="text" href="/login" />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
