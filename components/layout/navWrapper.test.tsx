import { render, screen } from "@testing-library/react";
import NavWrapper from "./navWrapper";

const mockUseNotFound = jest.fn();

jest.mock("@/contexts/NotFoundContext", () => ({
  useNotFound: () => mockUseNotFound(),
}));

jest.mock("./nav", () => ({
  __esModule: true,
  default: () => <div data-testid="nav-component" />,
}));

describe("NavWrapper", () => {
  beforeEach(() => {
    mockUseNotFound.mockReset();
  });

  it("renders Nav when page is not in not-found state", () => {
    mockUseNotFound.mockReturnValue({
      isNotFound: false,
      setIsNotFound: jest.fn(),
    });

    render(<NavWrapper />);

    expect(screen.getByTestId("nav-component")).toBeInTheDocument();
  });

  it("does not render Nav when page is in not-found state", () => {
    mockUseNotFound.mockReturnValue({
      isNotFound: true,
      setIsNotFound: jest.fn(),
    });

    render(<NavWrapper />);

    expect(screen.queryByTestId("nav-component")).not.toBeInTheDocument();
  });
});
