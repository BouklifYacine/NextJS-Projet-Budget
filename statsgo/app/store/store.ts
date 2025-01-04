import { create } from "zustand";

interface TableItem {
    id: number;
    prix: number;
    nom: string;
}

interface StoreNombre {
    compteur: number;
    rendu: boolean;
    tableau: TableItem[];
    plus: () => void;
    moins: () => void;
    reset: () => void;
    changement: () => void;
}

const useYacine = create<StoreNombre>()((set) => ({
    compteur: 0,
    rendu: false,
    tableau: [
        { id: 1, prix: 15, nom: "Tshirt" },
        { id: 2, prix: 20, nom: "norhane" },
        { id: 3, prix: 35, nom: "yachane" },
    ],
    plus: () => set((state) => {
        const newCompteur = state.compteur === 0 ? state.compteur + 1 : state.compteur * 2;
        return {
            compteur: newCompteur,
            tableau: newCompteur > 10 
                ? state.tableau.map((item) => 
                    item.id === 1 ? { ...item,  prix : 699} : item
                ) 
                : state.tableau,
        };
    }),
    moins: () => set((state) => ({ compteur: state.compteur - 1 })),
    reset: () => set((state) => ({
        compteur: 0,
        tableau: state.tableau.map(item => item.id === 1 ? {...item, nom: "reset" , prix : 0} : item)
    })),
    changement: () => set((state) => ({ rendu: !state.rendu })),
}));

export default useYacine;