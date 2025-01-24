import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
         Bienvenue sur notre BudgetGO
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl">
         Découvre un nouveau moyen de gérer tes revenus et dépenser
        </p>
        <div className="mt-10">
          <Link href="/signup">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Commencer 
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

