"use client";

import { use } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MoveDown, MoveUp } from "lucide-react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import { redirect } from "next/navigation";
import Alerte from "@/components/alert";
import toast, { Toaster } from 'react-hot-toast';
import AjouterDesRevenus from "@/components/BoutonAjouterRevenu";
import AjouterDesDepenses from "@/components/BoutonAjouterDepense";
import BoutonEditRevenus from "@/components/BoutonEditRevenu";
import BoutonEditDepenses from "@/components/BoutonEditDepenses";
import Link from "next/link";
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from 'chart.js';
import { Pie } from "react-chartjs-2";

interface Params {
  id: string;
}

interface Depense {
  id: number;
  prix: number;
  description: string;
  date: string;
}

interface Revenu {
  id: number;
  prix: number;
  description: string;
  date: string;
}

interface ResponseData {
  depenses: Depense[];
  revenus: Revenu[];
}

ChartJS.register(Tooltip, Legend, ArcElement , Title);

export default function DashboardPage({ params }: { params: Promise<Params> }) {
  const routeParams = use(params) as Params;
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ResponseData>({
    queryKey: ['utilisateur', routeParams.id],
    queryFn: async () => {
      const response = await axios.get<ResponseData>(`/api/utilisateurs/${routeParams.id}/`);
      return response.data;
    }
  });

  const NotifDepenseSupprimer = () => toast.success("Votre dépense vient d'être supprimée", {
    position: "top-center",
    duration: 3000,
    style: { color: "#10B981" }
  });

  const NotifRevenuSupprimer = () => toast.success("Votre revenu vient d'être supprimé", {
    position: "top-center",
    duration: 3000,
    style: { color: "#10B981" }
  });

  const SupprimerDepenses = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`/api/utilisateurs/${routeParams.id}/depenses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['utilisateur', routeParams.id]
      });
      NotifDepenseSupprimer();
    }
  });

  const SupprimerRevenus = useMutation({
    mutationFn: (id: number) => 
      axios.delete(`/api/utilisateurs/${routeParams.id}/revenus/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["utilisateur", routeParams.id]
      });
      NotifRevenuSupprimer();
    }
  });

  if (isLoading) return <div>Chargement...</div>;
  if (!data) return null;
  if (!session) redirect("/");

  const { depenses, revenus } = data;
  const totalDepenses = depenses.reduce((sum, dep) => sum + dep.prix, 0);
  const totalRevenus = revenus.reduce((sum, rev) => sum + rev.prix, 0);
  const balance = totalRevenus - totalDepenses;
  const nombredepenses = depenses.length;
  const nombrerevenu = revenus.length;

  const chartData = {
    labels: ['Revenus', 'Dépenses', 'Balance'],
    datasets: [
      {
        data: [totalRevenus, totalDepenses, Math.abs(balance)],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',  
          'rgba(220, 38, 38, 0.8)',  
          balance >= 0 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(249, 115, 22, 0.8)', 
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(220, 38, 38, 1)',
          balance >= 0 ? 'rgba(59, 130, 246, 1)' : 'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Budget',
        font: {
          size: 20,
          weight: 'bold' as const, 
        },
      },
    },
  };

  const utilisateur = { name: session?.user?.name || session?.user?.email || 'Utilisateur' };

  return (
    <div className="p-6">
      <Header session={session} utilisateur={utilisateur} />
      <h1 className="text-center mb-10 text-3xl font-bold">Dashboard de : {utilisateur.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-300 p-4 rounded-lg">
          <h2 className="font-bold mb-2">Total Revenus ({nombrerevenu})</h2>
          <p className="text-2xl font-bold text-green-500">{totalRevenus.toFixed(2)}€</p>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg">
          <h2 className="font-bold mb-2">Total Dépenses ({nombredepenses})</h2>
          <p className="text-2xl font-bold text-red-600">{totalDepenses.toFixed(2)}€</p>
        </div>
        <div className={`p-4 rounded-lg ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
          <h2 className="font-bold mb-2">Balance</h2>
          <p className={`text-2xl font-bold flex items-center ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
            {balance.toFixed(2)}€ {balance >= 0 ? <MoveUp /> : <MoveDown />}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-xl font-bold">Dernières dépenses</h2>
            <AjouterDesDepenses userId={routeParams.id} />
          </div>
          <div className="space-y-2">
            {depenses.map((depense) => (
              <div key={depense.id} className="bg-white p-4 rounded-2xl border border-gray-400 shadow">
                <div className="font-bold text-red-600 flex justify-between">
                  <p>-{depense.prix}€</p>
                  <p className="flex gap-x-3 cursor-pointer">
                    <Link href={{
                      pathname: `/utilisateur/${routeParams.id}/depenses/${depense.id}`,
                      query: { id: routeParams.id, iddepense: depense.id }
                    }}>
                      <BoutonEditDepenses />
                    </Link>
                    <Alerte texte="depense" Supprimer={() => SupprimerDepenses.mutate(depense.id)} />
                  </p>
                </div>
                <p>Description de la dépense : {depense.description}</p>
                <p className="text-sm text-gray-500">
                  Date : {new Date(depense.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-xl font-bold">Derniers Revenus</h2>
            <AjouterDesRevenus userId={routeParams.id} />
          </div>
          <div className="space-y-2">
            {revenus.map((revenu) => (
              <div key={revenu.id} className="bg-white p-4 rounded-2xl border border-gray-400 shadow">
                <div className="font-bold text-green-500 flex justify-between">
                  <p>+{revenu.prix}€</p>
                  <p className="flex gap-x-3 cursor-pointer">
                    <Link href={{
                      pathname: `/utilisateur/${routeParams.id}/revenus/${revenu.id}`,
                      query: { id: routeParams.id, revenuid: revenu.id }
                    }}>
                      <BoutonEditRevenus />
                    </Link>
                    <Alerte texte="revenu" Supprimer={() => SupprimerRevenus.mutate(revenu.id)} />
                  </p>
                </div>
                <p>Description du revenu : {revenu.description}</p>
                <p className="text-sm text-gray-500">
                  Date : {new Date(revenu.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
        <div className="max-w-md mx-auto h-96">
          {(data.depenses.length > 0 || data.revenus.length > 0) ? (
            <Pie data={chartData} options={chartOptions} />
          ) : (
            <p className="text-center text-gray-500">
              Aucune donnée disponible pour le graphique
            </p>
          )}
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}