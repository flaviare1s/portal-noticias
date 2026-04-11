import { render, screen } from "@testing-library/react";
import CategoryPage from "./news/category/[category]/page";
import NewsDetailPage from "./news/[slug]/page";

const mockNotFound = jest.fn();

jest.mock("next/navigation", () => ({
  notFound: () => mockNotFound(),
}));

jest.mock("@/components/news/CategoryNewsSection", () => ({
  CategoryNewsSection: ({ items }: { items: Array<{ title: string }> }) => (
    <div data-testid="category-news-section">{items.length}</div>
  ),
}));

describe("dynamic pages", () => {
  beforeEach(() => {
    mockNotFound.mockReset();
  });

  it("renders category page with matching articles", async () => {
    const page = await CategoryPage({
      params: Promise.resolve({ category: "money" }),
    });

    render(page);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Money");
    expect(screen.getByTestId("category-news-section")).toHaveTextContent("3");
  });

  it("renders category empty state when category has no articles", async () => {
    const page = await CategoryPage({
      params: Promise.resolve({ category: "infra" }),
    });

    render(page);

    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("Nenhuma");
  });

  it("calls notFound for invalid category", async () => {
    await CategoryPage({
      params: Promise.resolve({ category: "categoria-inventada" }),
    });

    expect(mockNotFound).toHaveBeenCalled();
  });

  it("resolves sanitized category slug with hyphens", async () => {
    const page = await CategoryPage({
      params: Promise.resolve({ category: "viagem-e-gastronomia" }),
    });

    render(page);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Viagem & Gastronomia",
    );
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("Nenhuma");
  });

  it("renders news detail for valid slug", async () => {
    const page = await NewsDetailPage({
      params: Promise.resolve({ slug: "next-js-15-lancamento" }),
    });

    render(page);

    expect(
      screen.getByText("Next.js 15: novidades e melhorias de performance"),
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("calls notFound for invalid slug", async () => {
    await NewsDetailPage({
      params: Promise.resolve({ slug: "nao-existe" }),
    });

    expect(mockNotFound).toHaveBeenCalled();
  });
});
