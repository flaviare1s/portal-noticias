import { render, screen } from "@testing-library/react";
import NavCategory from "./index";

describe("NavCategory", () => {
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
