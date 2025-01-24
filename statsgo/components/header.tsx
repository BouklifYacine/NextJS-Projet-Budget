import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Boutondeconnexion from "@/components/boutondeconnexion"
import Boutonconnexion from "@/components/boutonconnexion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Session } from "next-auth"

interface HeaderProps {
  session: Session | null
  utilisateur: { name: string | null } | null
}

export default function Header({ session, utilisateur }: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-gray-900">
              Logo
            </Link>
            <nav className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Accueil
                </Link>
                <Link
                  href="/favoris"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Favoris
                </Link>
                <Link
                  href="/faq"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  FAQ
                </Link>
              </div>
            </nav>
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                {session.user?.image ? (
                  <Avatar>
                    <AvatarImage src={session.user.image} alt="Avatar" />
                    <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                ) : (
                  <p className="text-xl font-semibold  text-gray-700">{utilisateur?.name || session.user?.email}</p>
                )}
                <Link href={`/utilisateur/${session?.user?.id}/dashboard`}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Boutondeconnexion />
              </div>
            ) : (
              <Boutonconnexion />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

