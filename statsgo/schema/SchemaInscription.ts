import {z} from "zod"

const SchemaInscription = z.object({
    password : z.string().min(6, 'Le mot de passe doit faire au minimum 6 caractères').trim().max(35 , "'Le mot de passe doit faire au minimum 35 caractères'"),
    email : z.string().email()
})

export default SchemaInscription