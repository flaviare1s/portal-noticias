import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { noticias } from "@/infrastructure/data/news";
import { CategoryNewsSection } from "./CategoryNewsSection";

describe("CategoryNewsSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when there are no items", () => {
    const { container } = render(<CategoryNewsSection items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders headline and carousel controls for larger collections", async () => {
    const user = userEvent.setup();
    window.innerWidth = 1200;

    render(<CategoryNewsSection items={noticias.slice(0, 5)} />);

    expect(screen.getByText(noticias[0].title)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Próximo" }));
    await user.click(screen.getByRole("button", { name: "Anterior" }));

    expect(window.HTMLElement.prototype.scrollBy).toHaveBeenCalled();
    expect(window.HTMLElement.prototype.scrollTo).toHaveBeenCalled();
  });

  it("hides carousel controls when all secondary items fit on screen", () => {
    window.innerWidth = 1200;

    render(<CategoryNewsSection items={noticias.slice(0, 4)} />);

    expect(screen.queryByRole("button", { name: "Próximo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Anterior" })).not.toBeInTheDocument();
  });

  it("uses 1 visible item on small screens", () => {
    window.innerWidth = 500;

    render(<CategoryNewsSection items={noticias.slice(0, 2)} />);

    expect(screen.queryByRole("button", { name: "Próximo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Anterior" })).not.toBeInTheDocument();
  });

  it("uses 2 visible items on medium screens", () => {
    window.innerWidth = 700;

    render(<CategoryNewsSection items={noticias.slice(0, 3)} />);

    expect(screen.queryByRole("button", { name: "Próximo" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Anterior" })).not.toBeInTheDocument();
  });
});
