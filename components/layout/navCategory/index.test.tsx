import { render, screen } from "@testing-library/react";
import NavCategory from "./index";
import { noticias } from "@/infrastructure/data/news";

const mockUseNews = jest.fn();

jest.mock("@/contexts/NewsContext", () => ({
  useNews: () => mockUseNews(),
}));

describe("NavCategory", () => {
  beforeEach(() => {
    mockUseNews.mockReset();
    mockUseNews.mockReturnValue({
      categories: Array.from(new Set(noticias.map((item) => item.category))),
    });
  });

  it("renders the available categories as links", () => {
    render(<NavCategory />);

    expect(screen.getByRole("link", { name: "Tecnologia" })).toHaveAttribute(
      "href",
      "/news/category/Tecnologia",
    );
    expect(screen.getByRole("link", { name: "Money" })).toHaveAttribute(
      "href",
      "/news/category/Money",
    );
  });
});
