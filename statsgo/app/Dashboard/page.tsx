"use client"
// import { auth } from "@/auth"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const DashboardPage =  ({ params }: { params: { id: string } }) => {
 const { data:  session} = useSession()
  console.log("Voici les données de la session " + session)
  
  // if (!session) {
  //   return redirect('/connexion')
  // }

  return (
    <div>
      <h1>Tableau de bord de {session?.user?.email}</h1>
      <p>ID Utilisateur : {session?.user?.id}</p>
    </div>
  )
}

export default DashboardPage