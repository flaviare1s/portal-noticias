import { noticias } from "@/infrastructure/data/news";
import {
  CategorySchema,
  NewsSchema,
  NewsSearchSchema,
  SectionSchema,
  SlugSchema,
} from "./news.schema";

describe("news schema", () => {
  it("accepts valid category and section values", () => {
    expect(CategorySchema.parse("Money")).toBe("Money");
    expect(SectionSchema.parse("destaque")).toBe("destaque");
  });

  it("validates a complete valid news item", () => {
    expect(() =>
      NewsSchema.parse({
        ...noticias[0],
        content:
          "Conteudo suficientemente longo para satisfazer o minimo exigido pelo schema de noticias.",
      }),
    ).not.toThrow();
  });

  it("rejects invalid slug format", () => {
    const invalidNews = {
      ...noticias[0],
      slug: "Slug Invalido",
    };

    expect(() => NewsSchema.parse(invalidNews)).toThrow(/kebab-case/i);
  });

  it("validates optional search fields and rejects invalid limits", () => {
    expect(() =>
      NewsSearchSchema.parse({
        query: "eco",
        category: "Money",
        section: "money",
        limit: 10,
      }),
    ).not.toThrow();

    expect(() =>
      NewsSearchSchema.parse({
        query: "ok",
        limit: 101,
      }),
    ).toThrow();
  });

  it("validates slug payload", () => {
    expect(SlugSchema.parse({ slug: "abc" })).toEqual({ slug: "abc" });
  });
});
