
import React from 'react'
import ShimmerButton from "@/components/ui/shimmer-button";
import Link from 'next/link';

const Boutonconnexion = () => {
  return (
    <Link href='/inscription'>
          <ShimmerButton className="px-4 py-1.5">
    <span className="text-center leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base">
      Connexion
    </span>
  </ShimmerButton>
    </Link>
  
  )
}

export default Boutonconnexion