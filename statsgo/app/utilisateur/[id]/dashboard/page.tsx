import { auth } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage({ params }: { params: { id: string } }) {
  const session = await auth()
  console.log(session)
  
  if (!session || !session.user) {
    redirect('/connexion')
  }

  return (
    <div>
      <h1>Dashboard de {session.user.name}</h1>
      <p>ID: {await params.id}</p>
      <Link href={`/utilisateur/${session?.user?.id}/depenses/${params.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
        Mes dépenses 
      </Link>
      <Link href={`/utilisateur/${session?.user?.id}/revenus/${params.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
        Mes revenus 
      </Link>
    </div>
  )
}