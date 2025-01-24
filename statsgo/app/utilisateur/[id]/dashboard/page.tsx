"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

 return (
   <div className="p-6">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
       <div className="bg-green-100 p-4 rounded-lg">
         <h2 className="font-bold mb-2">Total Revenus</h2>
         <p className="text-2xl">{totalRevenus.toFixed(2)}€</p>
       </div>
       <div className="bg-red-100 p-4 rounded-lg">
         <h2 className="font-bold mb-2">Total Dépenses</h2>
         <p className="text-2xl">{totalDepenses.toFixed(2)}€</p>
       </div>
       <div className={`p-4 rounded-lg ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
         <h2 className="font-bold mb-2">Balance</h2>
         <p className="text-2xl">{balance.toFixed(2)}€</p>
       </div>
     </div>

     <div className="grid md:grid-cols-2 gap-6">
       <div>
         <h2 className="text-xl font-bold mb-4">Dernières Dépenses</h2>
         <div className="space-y-2">
           {depenses.slice(0, 5).map((depense) => (
             <div key={depense.id} className="bg-white p-4 rounded-lg shadow">
               <p className="font-bold text-red-600">-{depense.prix}€</p>
               <p>{depense.description}</p>
               <p className="text-sm text-gray-500">
                 {new Date(depense.date).toLocaleDateString()}
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
               <p>{revenu.description}</p>
               <p className="text-sm text-gray-500">
                 {new Date(revenu.date).toLocaleDateString()}
               </p>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
}