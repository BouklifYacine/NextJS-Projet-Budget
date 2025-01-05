"use client"
import React, { useState } from 'react'



const Page = () => {
    const [chiffre, setChiffre] = useState(0)

    const plus = () => {
        setChiffre(chiffre => chiffre +1)
    }

    const reset = () => {
setChiffre(0)
    }
    
    const moins = () => {
        setChiffre(chiffre => chiffre - 1)
    }

    if(chiffre >= 10){
        return (
            <div>
                <p>{chiffre}</p>
                <button onClick={reset}>Reset</button>
            </div>
        )
    }


    if(chiffre <= -5){
        return (
            <div>
            <p>{chiffre}</p>
            <button onClick={reset}>Reset</button>
        </div>
        )
    }


  return (
   <>
     <div>
        <p>{chiffre}</p>
        <div className='flex gap-x-5'>
        <button onClick={plus} className='bg-red-500'>Bouton + 1</button>
        <button onClick={moins} className='bg-purple-500'>Bouton - 1 </button>
        </div>
      
    </div>
   </>
  )

 
}

export default Page