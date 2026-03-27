import { render, screen } from "@testing-library/react";
import Nav from "./index";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Nav", () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  it("renders only the home breadcrumb on root path", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Nav />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getAllByText("Home")).toHaveLength(1);
  });

  it("maps news slug to article title in breadcrumbs", () => {
    mockUsePathname.mockReturnValue("/news/next-js-15-lancamento");

    render(<Nav />);

    expect(screen.getByRole("link", { name: /Not.cias/i })).toBeInTheDocument();
    expect(
      screen.getByText("Next.js 15: novidades e melhorias de performance"),
    ).toBeInTheDocument();
  });

  it("decodes category segments in breadcrumbs", () => {
    mockUsePathname.mockReturnValue("/news/category/Pol%C3%ADtica");

    render(<Nav />);

    expect(screen.getByText(/Pol.tica/i)).toBeInTheDocument();
  });
});
