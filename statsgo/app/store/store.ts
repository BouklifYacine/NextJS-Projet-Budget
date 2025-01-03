// store/store.js
import { create } from "zustand";

interface TableItem {
    id: number;
    prix: number;
    nom: string;
}

interface StoreNombre {
    compteur: number;
    tableau: TableItem[];
    plus: () => void;
    moins: () => void;
    reset: () => void;
    
}

const useYacine = create<StoreNombre>((set) => ({
    compteur: 0,
    tableau: [
        { id: 1, prix: 10, nom: "yacine" },
        { id: 2, prix: 20, nom: "norhane" },
        { id: 3, prix: 35, nom: "yachane" },
    ],
    plus: () => set((state) => {
        const newCompteur = state.compteur === 0 ? state.compteur + 1 : state.compteur * 2;
        return {
            compteur: newCompteur,
            tableau: newCompteur > 10 
                ? state.tableau.map((item) => 
                    item.id === 1 ? { ...item, nom: "Yacine-V2" } : item
                ) 
                : state.tableau,
        };
    }),
    moins: () => set((state) => ({ compteur: state.compteur - 1 })),
    reset: () => set((state) => ({
       compteur : 0,
       tableau : state.tableau.map(item => item.id === 1 ? {...item , nom:"reset"} : item)
         })),
}));

export default useYacine;