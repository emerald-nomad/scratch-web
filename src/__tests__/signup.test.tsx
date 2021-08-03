/**
 * @jest-environment jsdom
 */

import React from "react";
import userEvent from "@testing-library/user-event";
import SignUp, { SIGN_UP_USER } from "pages/signup";
import { cleanup, render, screen, act, waitFor, within } from "lib";

const usernameExists = "Username Exists";
const nonMatchingPasswords = "Non matching password";
const passingPassword = "12345";
const passingUsername = "testuser";
const passingName = "Test User";

const mocks = [
  {
    request: {
      query: SIGN_UP_USER,
      variables: {
        input: {
          name: passingName,
          username: usernameExists,
          password: passingPassword,
          confirmPassword: passingPassword,
        },
      },
    },
    result: {
      errors: [{ data: { username: "Username already in use" } }],
    },
  },
  {
    request: {
      query: SIGN_UP_USER,
      variables: {
        input: {
          name: passingName,
          username: passingUsername,
          password: nonMatchingPasswords,
          confirmPassword: passingPassword,
        },
      },
    },
    result: {
      errors: [{ data: { confirmPassword: "Password fields do not match" } }],
    },
  },
  {
    request: {
      query: SIGN_UP_USER,
      variables: {
        input: {
          name: passingName,
          username: passingUsername,
          password: passingPassword,
          confirmPassword: passingPassword,
        },
      },
    },
    result: {
      data: {
        id: "1",
        name: "Test User",
        username: passingUsername,
      },
    },
  },
];

const typeInUserData = ({
  username = passingUsername,
  name = passingName,
  password = passingPassword,
  confirmPassword = passingPassword,
}) => {
  const submitBtn = screen.getByText("Sign Up");
  const nameInput = screen.getByLabelText("Name input");
  const usernameInput = screen.getByLabelText("Username input");
  const passwordInput = screen.getByLabelText("Password input");
  const confirmPasswordInput = screen.getByLabelText("Confirm Password input");

  userEvent.type(usernameInput, username);
  userEvent.type(nameInput, name);
  userEvent.type(passwordInput, password);
  userEvent.type(confirmPasswordInput, confirmPassword);

  act(() => {
    userEvent.click(submitBtn);
  });
};

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("Sign Up Page", () => {
  let router;

  beforeAll(() => {
    router = {
      push: jest.fn().mockImplementation(() => Promise.resolve()),
      prefetch: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    useRouter.mockReturnValue(router);
  });

  beforeEach(() => {
    render(<SignUp />, { mocks });
  });

  afterEach(() => {
    cleanup();
  });

  it("should have login form", async () => {
    const signUpForm = await screen.getByLabelText("Sign Up Form");
    const withinSignUpForm = within(signUpForm);

    expect(withinSignUpForm.getByLabelText("Username input"));
    expect(withinSignUpForm.getByLabelText("Name input"));
    expect(withinSignUpForm.getByLabelText("Password input"));
    expect(withinSignUpForm.getByLabelText("Confirm Password input"));

    expect(signUpForm).toMatchSnapshot();
  });

  it("should have banner section", async () => {
    const banner = await screen.getByLabelText("Banner");
    const withinBanner = within(banner);

    expect(withinBanner.getByLabelText("Banner Header 1"));
    expect(withinBanner.getByLabelText("Banner Header 2"));
    expect(withinBanner.getByAltText("Logo"));
    expect(withinBanner.getByAltText("Banner Image"));

    expect(banner).toMatchSnapshot();
  });

  it("should have a link to login page", async () => {
    const loginLink = await screen.getByLabelText("Login Link");

    const withinLink = within(loginLink);

    withinLink.getByText("Already have an account?");
    withinLink.getByLabelText("Link to Login");

    expect(loginLink).toMatchSnapshot();
  });

  it("should show errors for submitting form with empty inputs", async () => {
    const submitBtn = screen.getByText("Sign Up");

    act(() => {
      userEvent.click(submitBtn);
    });

    expect(await screen.findByText("Username is required"));
    expect(await screen.findByText("Name is required"));
    expect(await screen.findByText("Password is required"));
    expect(await screen.findByText("Confirm password is required"));

    expect(submitBtn).toMatchSnapshot();
  });

  it("should display error for username already being used", async () => {
    typeInUserData({ username: usernameExists });

    expect(await screen.findByText("Username already in use"));
  });

  it("should display error for mismatching passwords", async () => {
    typeInUserData({ password: nonMatchingPasswords });

    expect(await screen.findByText("Password fields do not match"));
  });

  it("should redirect to '/feed' page on successful signup", async () => {
    typeInUserData({});

    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/feed"));
  });
});
