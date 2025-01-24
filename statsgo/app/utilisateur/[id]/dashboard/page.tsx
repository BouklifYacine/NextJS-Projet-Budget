"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MoveDown, MoveUp } from "lucide-react";
import { useSession } from "next-auth/react";

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

export default function DashboardPage({ params }: { params: Promise<Params> }) {
 const routeParams = use(params) as Params;
 const {data : session} = useSession()
 
 const { data, isLoading } = useQuery<ResponseData>({
   queryKey: ['utilisateur', routeParams.id],
   queryFn: async () => {
     const response = await axios.get<ResponseData>(`/api/utilisateurs/${routeParams.id}/`);
     return response.data;
   }
 });

 if (isLoading) return <div>Chargement...</div>;
 if (!data) return null;

 const { depenses, revenus } = data;
 const totalDepenses = depenses.reduce((sum, dep) => sum + dep.prix, 0);
 const totalRevenus = revenus.reduce((sum, rev) => sum + rev.prix, 0);
 const balance = totalRevenus - totalDepenses;
 const nombredepenses = depenses.length
 const nombrerevenu = revenus.length

 return (
   <div className="p-6">

    <h1 className="text-center mb-10 text-3xl font-bold">Dashboard de : {session?.user?.name} </h1>
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
         <p className={`text-2xl font-bold flex items-center ${balance >= 0 ? "text-green-500": "text-red-500"}`}>{balance.toFixed(2)} € {balance >= 0 ? <MoveUp /> : <MoveDown />}</p>
       </div>
     </div>

     <div className="grid md:grid-cols-2 gap-6">
       <div>
         <h2 className="text-xl font-bold mb-4">Dernières Dépenses</h2>
         <div className="space-y-2">
           {depenses.slice(0, 5).map((depense) => (
             <div key={depense.id} className="bg-white p-4 rounded-lg shadow">
               <p className="font-bold text-red-600">-{depense.prix}€</p>
               <p>Description de la dépense : {depense.description}</p>
               <p className="text-sm text-gray-500">
                 Date : {new Date(depense.date).toLocaleDateString()}
               </p>
             </div>
           ))}
         </div>
       </div>

       <div>
         <h2 className="text-xl font-bold mb-4">Derniers Revenus</h2>
         <div className="space-y-2">
           {revenus.slice(0, 5).map((revenu) => (
             <div key={revenu.id} className="bg-white p-4 rounded-lg shadow">
               <p className="font-bold text-green-600">+{revenu.prix}€</p>
               <p>Description du revenu  : {revenu.description}</p>
               <p className="text-sm text-gray-500">
                 Date : {new Date(revenu.date).toLocaleDateString()}
               </p>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
}