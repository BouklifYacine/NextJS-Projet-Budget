"use client"
import React, { useState } from 'react'

const Exercice = () => {
    // Les articles disponibles
    const articles = [
        { id: 1, prix: 15, nom: "Tshirt" },
        { id: 2, prix: 20, nom: "norhane" },
        { id: 3, prix: 35, nom: "yachane" },
    ]

    // État pour le panier
    const [panier, setPanier] = useState<Array<{ id: number; prix: number; nom: string; quantity: number }>>([])
    const [total, setTotal] = useState(0)

    // Ajouter au panier
    const ajouterAuPanier = (articleId: number) => {
        const articleToAdd = articles.find(art => art.id === articleId)
        if (!articleToAdd) return

        setPanier(prevPanier => {
            const existingItem = prevPanier.find(item => item.id === articleId)
            
            let newPanier
            if (existingItem) {
                newPanier = prevPanier.map(item => 
                    item.id === articleId 
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            } else {
                newPanier = [...prevPanier, {...articleToAdd, quantity: 1}]
            }
            
            // Calculer le nouveau total
            const newTotal = newPanier.reduce((sum, item) => sum + (item.prix * item.quantity), 0)
            setTotal(newTotal)
            
            return newPanier
        })
    }

    // Retirer du panier
    const retirerDuPanier = (articleId: number) => {
        setPanier(prevPanier => {
            const existingItem = prevPanier.find(item => item.id === articleId)
            if (!existingItem) return prevPanier

            let newPanier
            if (existingItem.quantity > 1) {
                newPanier = prevPanier.map(item =>
                    item.id === articleId
                        ? {...item, quantity: item.quantity - 1}
                        : item
                )
            } else {
                newPanier = prevPanier.filter(item => item.id !== articleId)
            }

            // Calculer le nouveau total
            const newTotal = newPanier.reduce((sum, item) => sum + (item.prix * item.quantity), 0)
            setTotal(newTotal)

            return newPanier
        })
    }

    // Vider le panier
    const viderPanier = () => {
        setPanier([])
        setTotal(0)
    }

    return (
        <div className="text-center p-4">
            {/* Liste des articles disponibles */}
            <div className="space-y-4 mb-8">
                <h2 className="text-xl font-bold">Articles disponibles</h2>
                {articles.map(article => (
                    <div key={article.id} className="flex justify-center items-center gap-4">
                        <span>{article.nom}</span>
                        <span>{article.prix}€</span>
                        <button 
                            onClick={() => ajouterAuPanier(article.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Ajouter au panier
                        </button>
                    </div>
                ))}
            </div>

            {/* Panier */}
            <div className="border-t pt-4">
                <h2 className="text-xl font-bold mb-4">Panier</h2>
                {panier.map(item => (
                    <div key={item.id} className="flex justify-center items-center gap-4 mb-2">
                        <span>{item.nom}</span>
                        <span>{item.prix}€</span>
                        <span>x{item.quantity}</span>
                        <button 
                            onClick={() => retirerDuPanier(item.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Retirer
                        </button>
                    </div>
                ))}
                
                {panier.length > 0 && (
                    <div className="mt-4">
                        <p className="font-bold">Total: {total}€</p>
                        <button 
                            onClick={viderPanier}
                            className="px-4 py-2 bg-red-500 text-white rounded mt-2"
                        >
                            Vider le panier
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Exercice