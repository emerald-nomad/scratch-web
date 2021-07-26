import { render, RenderOptions } from "@testing-library/react";
import { JSXElementConstructor, ReactElement } from "react";

const Providers: React.FC = ({ children }) => {
  return <> {children}</>;
};

const customRender = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  options: Omit<RenderOptions, "wrapper"> = {}
) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render };
