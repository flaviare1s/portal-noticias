import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido")
    .toLowerCase(),
  message: z
    .string()
    .min(20, "Mensagem deve ter no mínimo 20 caracteres")
    .max(1000, "Mensagem deve ter no máximo 1000 caracteres"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
