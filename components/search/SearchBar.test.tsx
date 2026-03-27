import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";
import { SearchProvider, useSearch } from "./SearchContext";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

const SearchControls = () => {
  const { isOpen, setIsOpen } = useSearch();

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      Alternar busca
    </button>
  );
};

describe("SearchBar", () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
    mockUsePathname.mockReturnValue("/");
  });

  it("renders on supported routes when search is open and updates query", async () => {
    const user = userEvent.setup();

    render(
      <SearchProvider>
        <SearchControls />
        <SearchBar />
      </SearchProvider>,
    );

    expect(
      screen.queryByPlaceholderText(/Buscar por t.tulo, descri..o, categoria, data/i),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Alternar busca" }));

    const input = screen.getByPlaceholderText(/Buscar por t.tulo, descri..o, categoria, data/i);

    await user.type(input, "economia");

    expect(input).toHaveValue("economia");
  });

  it("does not render on unsupported routes", () => {
    mockUsePathname.mockReturnValue("/profile");

    render(
      <SearchProvider>
        <SearchControls />
        <SearchBar />
      </SearchProvider>,
    );

    expect(
      screen.queryByPlaceholderText(/Buscar por t.tulo, descri..o, categoria, data/i),
    ).not.toBeInTheDocument();
  });
});
