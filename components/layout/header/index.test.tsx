import { render, screen } from "@testing-library/react";
import Header from "./index";

const mockUseMediaQuery = jest.fn();

jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: (...args: unknown[]) => mockUseMediaQuery(...args),
  };
});

jest.mock("./desktopNavbar", () => ({
  __esModule: true,
  default: () => <div data-testid="desktop-navbar" />,
}));

jest.mock("./mobileMenu", () => ({
  __esModule: true,
  default: () => <div data-testid="mobile-menu" />,
}));

describe("Header", () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReset();
  });

  it("renders desktop navigation on large screens", () => {
    mockUseMediaQuery.mockReturnValue(true);

    render(<Header />);

    expect(screen.getByRole("link", { name: /PORTAL/i })).toHaveAttribute("href", "/");
    expect(screen.getByTestId("desktop-navbar")).toBeInTheDocument();
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("renders mobile navigation on small screens", () => {
    mockUseMediaQuery.mockReturnValue(false);

    render(<Header />);

    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
    expect(screen.queryByTestId("desktop-navbar")).not.toBeInTheDocument();
  });
});
