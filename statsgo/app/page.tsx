import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Boutondeconnexion from "@/components/boutondeconnexion";
import Boutonconnexion from "@/components/boutonconnexion";
import { prisma } from "@/prisma";

export default async function Home() {
  const session = await auth();

  const utilisateur = session?.user?.email && await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true }
   });

  console.log("Session:", session);
console.log("Utilisateur:", utilisateur);

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

            <Boutondeconnexion></Boutondeconnexion>
          </div>
        ) : (
          <div className="flex gap-x-5 items-center">
<p className="font-bold text-white">{utilisateur?.name || session.user?.email}</p>
 <Boutondeconnexion></Boutondeconnexion>

          </div>
         

          
        )
      ) : (
      <Boutonconnexion></Boutonconnexion>
      )}
    </div>
  );
}
