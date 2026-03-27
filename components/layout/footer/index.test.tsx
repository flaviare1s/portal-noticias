import { render, screen } from "@testing-library/react";
import Footer from "./index";

describe("Footer", () => {
  it("renders the copyright and footer links", () => {
    render(<Footer />);

    expect(
      screen.getByText(/2026 Portal de Not.cias\. Todos os direitos reservados/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "News" })).toHaveAttribute("href", "/news");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute("href", "/contact");
  });
});
