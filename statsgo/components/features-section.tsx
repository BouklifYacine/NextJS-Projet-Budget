import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Zap, Shield } from "lucide-react"

const features = [
  {
    title: "Solution innovante",
    description: "Fini les problèmes de dépenses",
    icon: Lightbulb,
  },
  {
    title: "Optimisation",
    description: "Rapide et fiable tout est centralisé.",
    icon: Zap,
  },
  {
    title: "Sécurité",
    description: "Vos infos sont en sécurite aucune fuite de données possible",
    icon: Shield,
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pourquoi nous choisir?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Nous nous démarquons de la concurrence 
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-8 w-8 text-purple-600" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

