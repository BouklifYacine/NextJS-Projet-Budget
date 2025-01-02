import { auth } from "@/auth";
import ShimmerButton from "@/components/ui/shimmer-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Boutondeconnexion from "@/components/boutondeconnexion";

export default async function Home() {
  const session = await auth();

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
          <p className="font-bold text-white">{session.user?.name}</p>
        )
      ) : (
        <ShimmerButton className="px-4 py-1.5">
          <span className="text-center leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base">
            Connexion
          </span>
        </ShimmerButton>
      )}
    </div>
  );
}
