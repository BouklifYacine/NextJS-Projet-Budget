"use client";

import React from "react";
import { Euro, NotepadText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { SchemaDepenses } from "@/schema/SchemaDepense";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Schema = z.infer<typeof SchemaDepenses>;

const CreerDepenses = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect("/");
  }
  const SessionId = session.user?.id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(SchemaDepenses),
  });

  const router = useRouter();

  const onSubmit = async (data: Schema) => {
    try {
      const response = await axios.post(
        `/api/utilisateurs/${SessionId}/depenses`,
        data
      );
      router.push(`/utilisateur/${SessionId}/dashboard`);
      reset();
      console.log(response.data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Créer une dépense
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {isSubmitting ? "En cours" : "Creer une dépense "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreerDepenses;
