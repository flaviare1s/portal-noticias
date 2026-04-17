import { render, screen, waitFor } from "@testing-library/react";
import MockServiceWorkerProvider from "./MockServiceWorkerProvider";

const ORIGINAL_ENV = process.env;
const start = jest.fn();

jest.mock("@/mocks/browser", () => ({
  worker: {
    start,
  },
}));

describe("MockServiceWorkerProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...ORIGINAL_ENV };
    delete process.env.NEXT_PUBLIC_ENABLE_MSW;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it("starts the worker in development before rendering children", async () => {
    process.env.NODE_ENV = "development";
    start.mockResolvedValue(undefined);

    render(
      <MockServiceWorkerProvider>
        <div>conteudo carregado</div>
      </MockServiceWorkerProvider>,
    );

    expect(screen.queryByText("conteudo carregado")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(start).toHaveBeenCalledWith({
        onUnhandledRequest: "bypass",
      });
    });

    expect(await screen.findByText("conteudo carregado")).toBeInTheDocument();
  });

  it("renders children immediately when mocking is disabled", async () => {
    process.env.NODE_ENV = "development";
    process.env.NEXT_PUBLIC_ENABLE_MSW = "false";

    render(
      <MockServiceWorkerProvider>
        <div>sem worker</div>
      </MockServiceWorkerProvider>,
    );

    expect(screen.getByText("sem worker")).toBeInTheDocument();
    expect(start).not.toHaveBeenCalled();
  });
});
