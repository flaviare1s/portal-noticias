import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DesktopNavbar from "./desktopNavbar";

const mockUsePathname = jest.fn();
const mockSetIsOpen = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("@/contexts/SearchContext", () => ({
  useSearch: () => ({
    isOpen: false,
    setIsOpen: mockSetIsOpen,
  }),
}));

describe("DesktopNavbar", () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
    mockSetIsOpen.mockReset();
  });

  it("renders primary and secondary navigation links", () => {
    mockUsePathname.mockReturnValue("/live");

    render(<DesktopNavbar />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Not.cias/i })).toHaveAttribute("href", "/news");
    expect(screen.getByRole("link", { name: "Ao Vivo" })).toHaveAttribute("href", "/live");
    expect(screen.getByRole("link", { name: /Pol.tica/i })).toHaveAttribute(
      "href",
      "/news/category/Política",
    );
    expect(screen.getByRole("button", { name: "account" }).closest("a")).toHaveAttribute(
      "href",
      "/profile",
    );
  });

  it("toggles search on supported routes", async () => {
    const user = userEvent.setup();
    mockUsePathname.mockReturnValue("/news");

    render(<DesktopNavbar />);

    await user.click(screen.getByRole("button", { name: "search" }));

    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it("hides search on unsupported routes", () => {
    mockUsePathname.mockReturnValue("/faq");

    render(<DesktopNavbar />);

    expect(screen.queryByRole("button", { name: "search" })).not.toBeInTheDocument();
  });
});
