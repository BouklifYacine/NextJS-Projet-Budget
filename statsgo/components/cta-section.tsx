import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Session } from "next-auth"

export default function CTASection({ session }: { session: Session | null }) {
  return (
    <section className="bg-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Pret a démarrer ? </h2>
        <p className="mt-4 text-xl">Rejoignez des centaines d'utilisateurs déja satisifait de notre outil </p>
        <div className="mt-8">
          {session ? (
            <Link href={`/utilisateur/${session?.user?.id}/dashboard`}>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Aller sur le dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/inscription">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Inscrivez vous
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

