import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const UtilisateurID = async () => {

    const session = await auth()
   const SessionID = session?.user?.id
    if(!session){
        redirect("/")
    }
    
  return (
    <div>Page utilisateur : {SessionID} </div>
  )
}

export default UtilisateurID