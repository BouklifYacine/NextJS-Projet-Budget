import { z } from "zod";

export const SchemaDepenses = z.object({
  prix: z
    .number({
      invalid_type_error: "Mettez un prix valide",
    })
    .min(1, "Le prix doit minimum faire 1 €"),

  description: z
    .string()
    .min(10, "Votre description doit avoir au minimum 10 caractères")
    .max(255, "Votre description ne peut pas dépasser les 255 caractères")
    .trim(),
});
