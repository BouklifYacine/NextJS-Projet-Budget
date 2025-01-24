import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Boutondeconnexion from "@/components/boutondeconnexion";
import Boutonconnexion from "@/components/boutonconnexion";
import { prisma } from "@/prisma";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log(session)

  const utilisateur = session?.user?.email 
  ? await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { name: true }
    })
  : null;

  return (
    <div className="bg-red-500 w-2/3 h-20 mx-auto mt-5 rounded-full flex items-center justify-around">
      <p>Logo</p>

      <div className="flex gap-x-6">
        <a href="" className="font-bold">
          Accueil
        </a>
        <a href="" className="font-bold">
          Favoris
        </a>
        <a href="" className="font-bold">
          FAQ
        </a>
      </div>

      {session ? (
  session.user?.image ? (
    <div className="flex gap-x-5">
      <Avatar>
        <AvatarImage src={session.user.image} alt="Avatar" />
        <AvatarFallback>
          {session.user.name?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
      <Link href={`/utilisateur/${session.user.id}/dashboard`} className="bg-blue-500 text-white px-4 py-2 rounded">
        Dashboard
      </Link>
      <Boutondeconnexion />
    </div>
  ) : (
    <div className="flex gap-x-5 items-center">
      <p className="font-bold text-white">{utilisateur?.name || session.user?.email}</p>
      <Link href={`/utilisateur/${session?.user?.id}/dashboard`} className="bg-blue-500 text-white px-4 py-2 rounded">
        Dashboard
      </Link>
      <Boutondeconnexion />
    </div>
  )
) : (
  <Boutonconnexion />
)}
    </div>
  );
}
