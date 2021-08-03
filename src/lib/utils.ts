import { UseFormSetError } from "react-hook-form";

export const setGraphqlErrors = ({
  errors,
  setError,
}: {
  errors: { [key: string]: string };
  setError: UseFormSetError<any>;
}) => {
  for (const prop in errors) {
    setError(prop, { message: errors[prop] });
  }
};
