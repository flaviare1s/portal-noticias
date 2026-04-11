export const sanitizeCategorySlug = (category: string): string => {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " e ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getCategoryBySlug = (
  categories: string[],
  slug: string,
): string | undefined => {
  return categories.find((category) => sanitizeCategorySlug(category) === slug);
};
