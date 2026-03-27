import { render, screen } from "@testing-library/react";
import { NewsCard } from "./NewsCard";

describe("NewsCard", () => {
  it("renders the article data and link", () => {
    render(
      <NewsCard
        slug="minha-noticia"
        title="Titulo principal"
        excerpt="Resumo da noticia"
        category="Tecnologia"
        imageUrl="https://picsum.photos/seed/test/800/400"
        imageAlt="Imagem da noticia"
        date="2025-03-15"
      />,
    );

    expect(screen.getByText("Tecnologia")).toBeInTheDocument();
    expect(screen.getByText("Titulo principal")).toBeInTheDocument();
    expect(screen.getByText("Resumo da noticia")).toBeInTheDocument();
    expect(screen.getByText("2025-03-15")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Imagem da noticia" })).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/news/minha-noticia");
  });

  it("omits optional excerpt and date when not provided", () => {
    render(
      <NewsCard
        slug="sem-detalhes"
        title="Titulo sem extras"
        category="Mundo"
        imageUrl="https://picsum.photos/seed/test-2/800/400"
        imageAlt="Imagem sem extras"
      />,
    );

    expect(screen.getByText("Titulo sem extras")).toBeInTheDocument();
    expect(screen.queryByText("2025-03-15")).not.toBeInTheDocument();
    expect(screen.queryByText("Resumo da noticia")).not.toBeInTheDocument();
  });
});
