import { z } from "zod";

export const SchemaDepenses = z.object({
    prix : z.number().min(1, " Vous devez mettre un prix"),
    description : z.string().min(1,"Vous devez rentrez une description").min(10,"Votre description doit avoir au minimum 10 caractères")
    .max(255, "Votre Description ne peut pas dépenser les 255 caractères").trim().optional()
})