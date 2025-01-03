import { create } from "zustand";

interface StoreNombre {
    compteur: number;
    plus: () => void;
    moins: () => void;
    reset: () => void;
}

const useYacine = create<StoreNombre>((set) => ({
    compteur: 0,
    plus: () => set((state) => ({ compteur: state.compteur + 1 })),
    reset: () => set({ compteur: 0 }), 
    moins: () => set((state) => ({ compteur: state.compteur - 1 })),
}));

export default useYacine