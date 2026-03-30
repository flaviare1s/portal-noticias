import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { noticias } from "@/infrastructure/data/news";
import { CategoryNewsSection } from "./CategoryNewsSection";

const mockUseSearch = jest.fn();

jest.mock("@/contexts/SearchContext", () => ({
  useSearchOptional: () => mockUseSearch(),
}));

describe("CategoryNewsSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearch.mockReturnValue({
      query: "",
      results: noticias,
    });
  });

  it("shows empty state when there are no items", () => {
    render(<CategoryNewsSection items={[]} />);

    expect(screen.getByText(/Nenhuma noticia encontrada/i)).toBeInTheDocument();
  });

  it("renders headline and carousel controls for larger collections", async () => {
    const user = userEvent.setup();
    window.innerWidth = 1200;

    render(<CategoryNewsSection items={noticias.slice(0, 5)} />);

    expect(screen.getByText(noticias[0].title)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Pr.ximo/i }));
    await user.click(screen.getByRole("button", { name: "Anterior" }));

    expect(window.HTMLElement.prototype.scrollBy).toHaveBeenCalled();
    expect(window.HTMLElement.prototype.scrollTo).toHaveBeenCalled();
  });

  it("hides carousel controls when all secondary items fit on screen", () => {
    window.innerWidth = 1200;

    render(<CategoryNewsSection items={noticias.slice(0, 4)} />);

    expect(screen.queryByRole("button", { name: "PrÃ³ximo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Anterior" })).not.toBeInTheDocument();
  });

  it("uses 1 visible item on small screens", () => {
    window.innerWidth = 500;

    render(<CategoryNewsSection items={noticias.slice(0, 2)} />);

    expect(screen.queryByRole("button", { name: "PrÃ³ximo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Anterior" })).not.toBeInTheDocument();
  });

  it("uses 2 visible items on medium screens", () => {
    window.innerWidth = 700;

    render(<CategoryNewsSection items={noticias.slice(0, 3)} />);

    expect(screen.queryByRole("button", { name: "PrÃ³ximo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Anterior" })).not.toBeInTheDocument();
  });

  it("shows empty state when query has no matches inside the category scope", () => {
    mockUseSearch.mockReturnValue({
      query: "Termo inexistente",
      results: [],
    });

    render(<CategoryNewsSection items={noticias.slice(0, 3)} />);

    expect(screen.getByText(/Nenhuma noticia encontrada/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Nao ha noticias para este filtro nesta categoria/i),
    ).toBeInTheDocument();
  });
});
