import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
},
  providers: [GitHub,Google, 

    Credentials({
    name : "Inscription",
    credentials : {
      email : {label : "email" , type : "email"},
      password : {label : "password" , type : "password"},
    }, 
    
    async authorize(credentials, request) {
      const email = credentials.email as string | undefined
      const password = credentials.password as string | undefined

      if(!email || !password){
        throw new Error("Vous devez remplir les deux champs ")
      }

      const user = await prisma.user.findUnique({
        where : {email}
      })

      if(!user){
        throw new Error (" Utilisateur introuvable")
      }

      const motdepasse = await bcrypt.compare(password, user.password)

      if(!motdepasse){
        throw new Error (" Le mot de passe est invalide")
      }

      return {
        id : user.id, 
        email : user.email
      }
    },

    })
  ],
})