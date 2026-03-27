import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import MobileMenu from "./mobileMenu";

const mockUsePathname = jest.fn();
const mockSetIsOpen = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("@/components/search/SearchContext", () => ({
  useSearch: () => ({
    isOpen: false,
    setIsOpen: mockSetIsOpen,
  }),
}));

describe("MobileMenu", () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
    mockSetIsOpen.mockReset();
  });

  it("opens and closes the drawer menu", async () => {
    const user = userEvent.setup();
    mockUsePathname.mockReturnValue("/news");

    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: "open menu" }));
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ao vivo/i })).toHaveAttribute("href", "/live");

    await user.click(screen.getByRole("button", { name: "close menu" }));
  });

  it("toggles search on supported routes", async () => {
    mockUsePathname.mockReturnValue("/news/categoria");

    render(<MobileMenu />);

    fireEvent.click(screen.getByTestId("SearchIcon"));

    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it("hides search button on unsupported routes", () => {
    mockUsePathname.mockReturnValue("/contact");

    render(<MobileMenu />);

    expect(screen.queryByRole("button", { name: "search" })).not.toBeInTheDocument();
  });
});
