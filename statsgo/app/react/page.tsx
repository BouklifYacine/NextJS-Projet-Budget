"use client"
import React, { useState } from 'react'
import useYacine from '../store/store'

const Exercice = () => {
  
   const [rendu, setRendu] = useState(false)
 
   const CalculMoyenne = () => {
       const moyenne = tableau.reduce((acc, element) => acc + element.prix, 0) / tableau.length;
       return moyenne.toFixed(2)
   }


   const changement = () => {
       setRendu(!rendu)
   }
   const {compteur, moins , plus , reset, tableau } = useYacine()

   return (
       <div className="text-center p-4">
           <button onClick={plus} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">+</button>
           <button onClick={moins} className="px-4 py-2 bg-red-500 text-white rounded mr-2">-</button>
           <button onClick={reset} className="px-4 py-2 bg-red-500 text-white rounded">Reset</button>
           <p className="mt-4">Compteur : {compteur}</p>

           <button 
               onClick={changement} 
               className="px-4 py-2 bg-green-500 text-white rounded my-4"
           >
               Changer le rendu
           </button>

           <div className="my-4">
               {rendu ? "Salut" : "Tchao"}
           </div>

           <div className="space-y-2">
               {tableau.map(tab => (
                   <div key={tab.id} className="flex justify-center gap-x-4">
                       <span className="font-bold">{tab.nom}</span>
                       <span>{tab.prix}€</span>
                   </div>
               ))}
           </div>

           <p className="mt-4">
               Moyenne des prix : {CalculMoyenne()}€
           </p>
       </div>
   )
}

export default Exercice