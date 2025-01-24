import { auth } from "@/auth"
import { prisma } from "@/prisma"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default async function Home() {
  const session = await auth()

  const utilisateur = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { name: true },
      })
    : null

  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} utilisateur={utilisateur} />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CTASection session={session} />
      </main>
      <Footer />
    </div>
  )
}

