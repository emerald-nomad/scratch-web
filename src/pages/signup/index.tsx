import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Button, Input, ScratchImage } from "components";
import logo from "../../assets/images/logo.svg";
import logoNoText from "../../assets/images/logo-no-text.svg";
import authBanner from "../../assets/images/auth-banner.jpeg";
import styles from "styles/Auth.module.scss";
import { setGraphqlErrors } from "lib";

interface SignUpFormData {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const SignUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  name: yup.string().required("Name is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
});

export const SIGN_UP_USER = gql`
  mutation SignUp($input: SignUpInput!) {
    signup(input: $input) {
      token
      user {
        id
        name
        username
      }
    }
  }
`;

const SignUp: React.FC = () => {
  const router = useRouter();

  const [signUpUser, { loading }] =
    useMutation<{ input: SignUpFormData }>(SIGN_UP_USER);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({ resolver: yupResolver(SignUpSchema) });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const res = await signUpUser({ variables: { input: data } });

      router.push("/feed");
    } catch (error) {
      const { data } = error.graphQLErrors[0];
      setGraphqlErrors({ errors: data, setError });
    }
  };

  return (
    <div className={styles.container}>
      <div aria-label="Banner" className={styles.banner}>
        <ScratchImage src={logo} alt="Logo" />
        <h1 aria-label="Banner Header 1" className={styles["banner__header-1"]}>
          Start <br /> from Scratch!
        </h1>
        <h1 aria-label="Banner Header 2" className={styles["banner__header-2"]}>
          Start from Scratch!
        </h1>
        <ScratchImage src={authBanner} alt="Banner Image" />
      </div>

      <section className={styles["content"]}>
        <div className={styles["content__background"]}>
          <ScratchImage src={logoNoText} alt="Logo without text" />
          <ScratchImage src={logo} alt="Logo" />
        </div>
        <h1 className={styles["content__heading"]}>Start from Scratch</h1>
        <span className={styles["message"]}>Create account to continue.</span>
        <form aria-label="Sign Up Form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Username"
            control={control}
            name="username"
            error={errors.username?.message}
          />

          <Input
            label="Name"
            control={control}
            name="name"
            error={errors.name?.message}
          />

          <Input
            label="Password"
            control={control}
            name="password"
            error={errors.password?.message}
            type="password"
          />

          <Input
            label="Confirm Password"
            control={control}
            name="confirmPassword"
            error={errors.confirmPassword?.message}
            type="password"
          />

          <Button text="Sign Up" type="submit" />
        </form>

        <div aria-label="Login Link">
          <p>Already have an account?</p>
          <Button
            aria-label="Link to Login"
            text="Login!"
            style="text"
            href="/login"
          />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
