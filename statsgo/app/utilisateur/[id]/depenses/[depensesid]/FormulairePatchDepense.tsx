'use client';

import React from "react";
import { Euro, NotepadText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SchemaDepenses } from "@/schema/SchemaDepense";


type Schema = z.infer<typeof SchemaDepenses>;

interface Depense {
  prix: number;
  description: string;
}

export default function FormulairePatchDepense({ 
  userId, 
  depenseId 
}: { 
  userId: string;
  depenseId: string | null;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();


  const { data: depense, isLoading } = useQuery<Depense>({
    queryKey: ["depense", depenseId],
    queryFn: async () => {
      const response = await axios.get(`/api/utilisateurs/${userId}/depenses/${depenseId}`);
      return response.data;
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(SchemaDepenses),
    defaultValues: {
      prix: depense?.prix,
      description: depense?.description
    }
  });

  const modifierDepense = useMutation({
    mutationFn: (data: Schema) =>
      axios.patch(`/api/utilisateurs/${userId}/depenses/${depenseId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["depense", depenseId] });
      router.push(`/utilisateur/${userId}/dashboard`);
    }
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Modifier la dépense</h2>

        <form onSubmit={handleSubmit((data) => modifierDepense.mutate(data))} className="space-y-4">
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
            {isSubmitting ? "En cours..." : "Modifier la dépense"}
          </button>
        </form>
      </div>
    </div>
  );
}