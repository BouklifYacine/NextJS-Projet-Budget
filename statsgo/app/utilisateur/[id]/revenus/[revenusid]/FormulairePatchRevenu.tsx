"use client"

import React from 'react'
import { SchemaRevenus } from '@/schema/SchemaRevenus'
import {z} from "zod"
import { useRouter } from 'next/navigation'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Euro, NotepadText } from 'lucide-react'

type Schema = z.infer<typeof SchemaRevenus>

interface Revenu {
  prix : number, 
  description : string 
}

const FormulairePatchRevenu = ({userId, revenuId} : {userId : string , revenuId : string | null}) => {

  const router = useRouter()
  const QueryClient = useQueryClient()
  
  const { data : revenu, isLoading } = useQuery<Revenu>({
    queryKey : ["revenu", revenuId], 
    queryFn : async ()=> {
      const response = await axios.get(`/api/utilisateurs/${userId}/revenus/${revenuId}`)
      return response.data
    }
  })

  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<Schema>({
      resolver: zodResolver(SchemaRevenus),
      defaultValues: {
        prix: revenu?.prix,
        description: revenu?.description
      }
    });

    const modifierRevenu = useMutation({
      mutationFn : (data : Schema) => axios.patch(`/api/utilisateurs/${userId}/revenus/${revenuId}` , data), 
      onSuccess: () => {
        QueryClient.invalidateQueries({queryKey : ["revenu", revenuId]})
        router.push(`/utilisateur/${userId}/dashboard`)
      }
    })

    if(isLoading) return <div> Chargement ... </div>
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center mb-6">Modifier le revenu </h2>

      <form onSubmit={handleSubmit((data) => modifierRevenu.mutate(data))} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Prix *
          </label>
          <div className="relative">
            <Euro
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              {...register("prix", {
                valueAsNumber: true,
              })}
              type="number"
              defaultValue={revenu?.prix}
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Votre prix"
            />
          </div>
          {errors.prix && (
            <p className="text-red-500 text-xs mt-1">{errors.prix.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <div className="relative">
            <NotepadText
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              {...register("description")}
              type="text"
              defaultValue={revenu?.description}
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description"
            />
          </div>
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "En cours..." : "Modifier le revenu"}
        </button>
      </form>
    </div>
  </div>
  )
}

export default FormulairePatchRevenu