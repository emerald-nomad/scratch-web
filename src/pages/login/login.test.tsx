/**
 * @jest-environment jsdom
 */

import React from "react";
import userEvent from "@testing-library/user-event";
import Login, { LOGIN_USER } from "./index";
import { cleanup, MockResponse, render, screen, act } from "lib";

const testPassword = "12345";
const failingUsername = "Error";

const mocks: MockResponse[] = [
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
    error: {
      name: "Test",
      message: "Test",
    },
  },
  {
    request: {
      query: LOGIN_USER,
      variables: {
        input: {
          username: "testuser",
          password: testPassword,
        },
      },
    },
    result: {
      data: {
        id: "1",
        name: "Test User",
        username: "testuser",
      },
    },
  },
];

describe("Login Page", () => {
  beforeEach(() => {
    render(<Login />, { mocks });
  });

  afterEach(() => {
    cleanup();
  });

  it("should have login form", async () => {
    const loginForm = await screen.getByLabelText("Login Form");

    expect(loginForm).toMatchSnapshot();
  });

  it("should have banner section", async () => {
    const banner = await screen.getByLabelText("Banner");

    expect(banner).toMatchSnapshot();
  });

  it("should have a link to signup page", async () => {
    const signupLink = await screen.getByLabelText("Sign Up Link");

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

  it.todo("should display error for bad username/password combination");

  it.todo("should redirect to 'feed' page on successful login");
});
