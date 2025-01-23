
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const DashboardPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  
  if (!session) {
    return redirect('/connexion')
  }

  return (
    <div>
      <h1>Tableau de bord de {session?.user?.email}</h1>
      <p>ID Utilisateur : {session.user?.id}</p>
    </div>
  )
}

export default DashboardPage