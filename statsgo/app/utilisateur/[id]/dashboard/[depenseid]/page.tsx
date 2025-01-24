import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Depenseid({ params }: { params: { id: string } }) {
  const session = await auth()
  console.log(session)

  const paramètres = await params.id
  
  if (!session || !session.user) {
    redirect('/connexion')
  }


  return (
    <div>
      <h1>Dashboard de {session.user.name}</h1>
      <p>ID: {await paramètres}</p>
    </div>
  )
}