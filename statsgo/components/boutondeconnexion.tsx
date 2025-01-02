"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const Boutondeconnexion = () => {
  return (
    <Button onClick={() => signOut()}> Déconnexion </Button>
  )
}

export default Boutondeconnexion