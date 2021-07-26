/**
 * @jest-environment jsdom
 */

import React from "react";
import Login from "./index";
import { cleanup, render, screen } from "lib/test-utils";

describe("Login Page", () => {
  afterEach(() => {
    cleanup();
  });

  it("should pass", async () => {
    render(<Login />);
    const banner = await screen.getByLabelText("Banner");
    console.log(banner);
    expect(true).toBeTruthy();
  });
});
