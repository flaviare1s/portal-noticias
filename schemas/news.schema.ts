import { z } from "zod";

export const CategorySchema = z.enum([
  "Tecnologia",
  "Política",
  "Esportes",
  "Money",
  "Mundo",
  "Agro",
  "Cultura",
]);

export const SectionSchema = z.enum([
  "destaque",
  "geral",
  "webstory",
  "politica",
  "esportes",
  "money",
  "review",
]);

export const NewsSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug é obrigatório")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug deve ser kebab-case válido"),
  title: z
    .string()
    .min(10, "Título deve ter no mínimo 10 caracteres")
    .max(200, "Título deve ter no máximo 200 caracteres"),
  excerpt: z
    .string()
    .min(20, "Resumo deve ter no mínimo 20 caracteres")
    .max(300, "Resumo deve ter no máximo 300 caracteres"),
  content: z.string().min(50, "Conteúdo deve ter no mínimo 50 caracteres"),
  imageUrl: z.string().url("URL da imagem inválida"),
  imageAlt: z
    .string()
    .min(5, "Texto alternativo da imagem deve ter no mínimo 5 caracteres")
    .max(200, "Texto alternativo da imagem deve ter no máximo 200 caracteres"),
  category: CategorySchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
  section: SectionSchema,
});

export const NewsSearchSchema = z.object({
  query: z.string().min(3, "Busca deve ter no mínimo 3 caracteres").optional(),
  category: CategorySchema.optional(),
  section: SectionSchema.optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export const SlugSchema = z.object({
  slug: z.string().min(1, "Slug é obrigatório"),
});

export type NewsInput = z.infer<typeof NewsSchema>;
export type NewsSearchInput = z.infer<typeof NewsSearchSchema>;
export type SlugInput = z.infer<typeof SlugSchema>;
