import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, RenderOptions } from "@testing-library/react";
import { JSXElementConstructor, ReactElement } from "react";

export type MockResponse = MockedResponse<Record<string, any>>;
interface Params {
  options?: Omit<RenderOptions, "wrapper">;
  mocks?: MockResponse[];
}

const customRender = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  params?: Params
) => {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <MockedProvider mocks={params?.mocks ?? []}>{children}</MockedProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...(params?.options ?? {}) });
};

export * from "@testing-library/react";

export { customRender as render };
