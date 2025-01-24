import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">A Propos</h3>
            <p className="text-gray-400">Vos revenus et dépenses tout centralisés </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens : </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/favoris" className="text-gray-400 hover:text-white">
                  Favoris
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Email: yacine.698@live.fr
              <br />
              Phone: 01 02 03 04 05
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} YacineCorp</p>
        </div>
      </div>
    </footer>
  )
}

