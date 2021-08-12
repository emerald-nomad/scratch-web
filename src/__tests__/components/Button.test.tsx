/**
 * @jest-environment jsdom
 */

import { render, screen } from "lib";
import Button, { ButtonProps } from "components/Button/Button";

describe("Button Component", () => {
  it("should have a 'btn--solid' class", () => {
    render(<Button text="Btn" style="solid" />);

    const btn = screen.getByRole("button");

    expect(btn.classList.contains("btn--solid"));
    expect(btn).toMatchSnapshot();
  });

  it("should have a 'btn--outline' class", () => {
    render(<Button text="Btn" style="outline" />);

    const btn = screen.getByRole("button");

    expect(btn.classList.contains("btn--outline"));
    expect(btn).toMatchSnapshot();
  });

  it("should have a 'btn--text' class", () => {
    render(<Button text="Btn" style="text" />);

    const btn = screen.getByRole("button");

    expect(btn.classList.contains("btn--text"));
    expect(btn).toMatchSnapshot();
  });

  it("should have the text 'Btn'", () => {
    render(<Button text="Btn" />);

    const btn = screen.getByRole("button");
    expect(screen.getByText("Btn"));
    expect(btn).toMatchSnapshot();
  });

  it("should show the loading indicator instead of text while loading", () => {
    render(<Button text="Btn" loading={true} />);

    const btn = screen.getByRole("button");

    expect(screen.getByLabelText("Loading Indicator"));
    expect(btn).toMatchSnapshot();
  });
});
