"use client"
import React, { useState } from 'react'

const Exercice = () => {
    const [compteur, setCompteur] = useState(0)
    const [rendu , setRendu] = useState(false)
   

    const plus = () => {
        setCompteur(compteur => compteur === 0 ? compteur + 1 : compteur * 2)
    }

    const moins = () => {
        setCompteur(compteur => compteur - 1)
    }

    const reset = () => {
        setCompteur(0)
    }

    const changement = () => {
        setRendu(!rendu)
    }

    return (

     
        <div className="text-center p-4">
            <button onClick={plus} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">+</button>
            <button onClick={moins} className="px-4 py-2 bg-red-500 text-white rounded mr-2">-</button>
            <button onClick={reset} className="px-4 py-2 bg-red-500 text-white rounded">reset</button>
            <p className="mt-4">Compteur : {compteur}</p>


            <button onClick={changement}> Changer le truc </button>

           {
            rendu ? "Salut" : "Tchao "
           }
        </div>
    )
}

export default Exercice