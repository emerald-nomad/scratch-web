import { ApolloError } from "apollo-server-micro";

type ErrorData = Record<string, string>;

export const ServerError = () => new ApolloError("Server Error", "SERVER_ERROR");

export const AuthorizationError = () => new ApolloError("Authorization Error", "AUTHORIZATION_ERROR");

export const AUTHENTICATION_ERROR_CODE = "AUTHENTICATION_ERROR";
export const AuthenticationError = (errors: ErrorData) => new ApolloError("Authentication Error", AUTHENTICATION_ERROR_CODE , errors);

export const SIGNUP_ERROR_CODE = "SIGNUP_ERROR_CODE";
export const SignUpError = (errors: ErrorData) => new ApolloError("SignUp Error", SIGNUP_ERROR_CODE, errors);