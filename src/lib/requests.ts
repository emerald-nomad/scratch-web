import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        username
      }
    }
  }
`;

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
