import { render, screen } from "@testing-library/react";
import { noticias } from "@/infrastructure/data/news";
import { NewsGrid } from "./NewsGrid";

const mockUseSearch = jest.fn();
const mockUseNews = jest.fn();

jest.mock("@/contexts/SearchContext", () => ({
  useSearch: () => mockUseSearch(),
}));

jest.mock("@/contexts/NewsContext", () => ({
  useNews: () => mockUseNews(),
}));

describe("NewsGrid", () => {
  beforeEach(() => {
    mockUseSearch.mockReset();
    mockUseNews.mockReset();
    mockUseNews.mockReturnValue({ news: noticias });
    mockUseSearch.mockReturnValue({
      query: "",
      results: noticias,
    });
  });

  it("renders limited items when limit is provided", () => {
    render(<NewsGrid items={noticias} limit={2} />);

    expect(screen.getByText(noticias[0].title)).toBeInTheDocument();
    expect(screen.getByText(noticias[1].title)).toBeInTheDocument();
    expect(screen.queryByText(noticias[2].title)).not.toBeInTheDocument();
  });

  it("uses search results when there is an active query", () => {
    mockUseSearch.mockReturnValue({
      query: "Selic",
      results: [noticias.find((item) => item.slug === "selic-bcb-decisao")],
    });

    render(<NewsGrid />);

    expect(screen.getByText(/BC mant.m Selic em 10,5% e sinaliza cautela com infla..o/i)).toBeInTheDocument();
    expect(screen.queryByText(noticias[0].title)).not.toBeInTheDocument();
  });

  it("renders home variant layout branches for featured positions", () => {
    render(<NewsGrid items={noticias.slice(0, 4)} variant="home" />);

    expect(screen.getByText(noticias[0].title)).toBeInTheDocument();
    expect(screen.getByText(noticias[1].title)).toBeInTheDocument();
    expect(screen.getByText(noticias[2].title)).toBeInTheDocument();
    expect(screen.getByText(noticias[3].title)).toBeInTheDocument();
  });
});
