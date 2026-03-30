import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";
import NewsPage from "./news/page";
import FaqPage from "./faq/page";
import ProfilePage from "./profile/page";
import LivePage from "./live/page";
import ContactPage from "./contact/page";
import { noticias } from "@/infrastructure/data/news";

const mockUsePathname = jest.fn();
const mockUseNews = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock("@/contexts/NewsContext", () => ({
  useNews: () => mockUseNews(),
}));

jest.mock("@/components/news/NewsGrid", () => ({
  NewsGrid: ({ variant }: { variant?: string }) => (
    <div data-testid="news-grid">{variant ?? "news"}</div>
  ),
}));

jest.mock("./contact/components/contactForm", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-form" />,
}));

describe("static pages", () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
    mockUsePathname.mockReturnValue("/news");
    mockUseNews.mockReset();
    mockUseNews.mockReturnValue({
      categories: Array.from(new Set(noticias.map((item) => item.category))),
    });
  });

  it("renders the home page grid", () => {
    render(<Home />);

    expect(screen.getByTestId("news-grid")).toHaveTextContent("home");
  });

  it("renders the news page heading, categories and grid", () => {
    render(<NewsPage />);

    expect(screen.getByRole("heading", { name: /Not.cias/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Todas" })).toBeInTheDocument();
    expect(screen.getByTestId("news-grid")).toHaveTextContent("news");
  });

  it("renders faq content and expands an answer", async () => {
    const user = userEvent.setup();

    render(<FaqPage />);

    await user.click(screen.getByText(/O que . o Portal de Not.cias\?/i));

    expect(
      screen.getByText(
        /O Portal de Not.cias . uma plataforma dedicada a compartilhar conte.dos atualizados/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders profile and live placeholders", () => {
    const { rerender } = render(<ProfilePage />);

    expect(screen.getByRole("heading", { name: /P.gina em constru..o/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Voltar para Home" })).toHaveAttribute("href", "/");

    rerender(<LivePage />);

    expect(screen.getByRole("heading", { name: "Ao Vivo" })).toBeInTheDocument();
    expect(screen.getByText(/Sem not.cias ao vivo no momento/i)).toBeInTheDocument();
  });

  it("renders contact page composition", () => {
    render(<ContactPage />);

    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
  });
});
