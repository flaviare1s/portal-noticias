import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchProvider, useSearch } from "./SearchContext";

const SearchConsumer = () => {
  const { query, setQuery, isOpen, setIsOpen, results } = useSearch();

  return (
    <div>
      <span data-testid="query">{query}</span>
      <span data-testid="is-open">{String(isOpen)}</span>
      <span data-testid="results-count">{results.length}</span>
      <button onClick={() => setQuery("Selic")}>Buscar</button>
      <button onClick={() => setIsOpen(true)}>Abrir</button>
    </div>
  );
};

describe("SearchContext", () => {
  it("throws when hook is used outside provider", () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => render(<SearchConsumer />)).toThrow(
      "useSearch must be used within SearchProvider",
    );

    console.error = originalError;
  });

  it("provides default state and filters results by query", async () => {
    const user = userEvent.setup();

    render(
      <SearchProvider>
        <SearchConsumer />
      </SearchProvider>,
    );

    expect(screen.getByTestId("query")).toHaveTextContent("");
    expect(screen.getByTestId("is-open")).toHaveTextContent("false");
    expect(Number(screen.getByTestId("results-count").textContent)).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Abrir" }));
    await user.click(screen.getByRole("button", { name: "Buscar" }));

    expect(screen.getByTestId("query")).toHaveTextContent("Selic");
    expect(screen.getByTestId("is-open")).toHaveTextContent("true");
    expect(screen.getByTestId("results-count")).toHaveTextContent("1");
  });
});
