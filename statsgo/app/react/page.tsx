"use client"
import React, { useState } from 'react'

const Exercice = () => {
    const [compteur, setCompteur] = useState(0)
    const [rendu , setRendu] = useState(false)
    const [tableau,setTableau] = useState([
        {id : 1 , prix : 10 , nom : "yacine"}, 
        {id : 2 , prix : 20 , nom : "norhane"},
        {id : 3 , prix : 35 , nom : "yachane"}
    ])

    const CalculMoyenne = () => {
        const moyenne = tableau.reduce((acc, element) => acc + element.prix, 0) / tableau.length;
        return moyenne.toFixed(2) 
      };
   

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

           <div>
            {
                tableau.map(tab => (
                    <div key={tab.id} className='flex gap-x-4'>
                        <a >{tab.nom}</a>
                        <a >{tab.prix}</a>
                    </div>
                    
                ))
                
            }
           </div>

           <p>
           <a >{CalculMoyenne()}</a>
           </p>
        </div>
    )
}

export default Exercice