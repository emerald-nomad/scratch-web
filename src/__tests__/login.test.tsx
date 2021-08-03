/**
 * @jest-environment jsdom
 */

import React from "react";
import userEvent from "@testing-library/user-event";
import Login, { LOGIN_USER } from "pages/login";
import { cleanup, render, screen, act, waitFor, within } from "lib";

const testPassword = "12345";
const failingUsername = "Error";
const passingUsername = "testuser";

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: {
          username: failingUsername,
          password: testPassword,
        },
      },
    },
    result: {
      errors: [{ data: { password: "Invalid username/password combination" } }],
    },
  },
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: {
          username: passingUsername,
          password: testPassword,
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
  password = testPassword,
}) => {
  const submitBtn = screen.getByText("Login");
  const usernameInput = screen.getByLabelText("Username input");
  const passwordInput = screen.getByLabelText("Password input");

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);

  act(() => {
    userEvent.click(submitBtn);
  });
};

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("Login Page", () => {
  let router;

  beforeAll(() => {
    router = {
      push: jest.fn().mockImplementation(() => Promise.resolve()),
      prefetch: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    useRouter.mockReturnValue(router);
  });

  beforeEach(() => {
    render(<Login />, { mocks });
  });

  afterEach(() => {
    cleanup();
  });

  it("should have login form", async () => {
    const loginForm = await screen.getByLabelText("Login Form");
    const withinLoginForm = within(loginForm);

    expect(withinLoginForm.getByLabelText("Username input"));
    expect(withinLoginForm.getByLabelText("Password input"));

    expect(loginForm).toMatchSnapshot();
  });

  it("should have banner section", async () => {
    const banner = await screen.getByLabelText("Banner");
    const withinBanner = within(banner);

    expect(withinBanner.getByLabelText("Banner Header"));
    expect(withinBanner.getByAltText("Logo"));
    expect(withinBanner.getByAltText("Banner Image"));

    expect(banner).toMatchSnapshot();
  });

  it("should have a link to signup page", async () => {
    const signupLink = await screen.getByLabelText("Sign Up Link");
    const withinSignUpLink = within(signupLink);

    withinSignUpLink.getByText("New to Scratch?");
    withinSignUpLink.getByLabelText("Link to Sign Up");

    expect(signupLink).toMatchSnapshot();
  });

  it("should show errors for submitting form with empty inputs", async () => {
    const submitBtn = screen.getByText("Login");

    act(() => {
      userEvent.click(submitBtn);
    });

    expect(await screen.findByText("Username is required"));
    expect(await screen.findByText("Password is required"));
    expect(submitBtn).toMatchSnapshot();
  });

  it("should display error for bad username/password combination", async () => {
    typeInUserData({ username: failingUsername });

    expect(await screen.findByText("Invalid username/password combination"));
  });

  it("should redirect to '/feed' page on successful login", async () => {
    typeInUserData({});
    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/feed"));
  });
});
