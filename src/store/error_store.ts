import { create } from "zustand";

// Definimos el tipo de un error
interface ApiError {
   status?: number; // Código de estado HTTP
   message: string; // Mensaje del error
}

// Definimos el tipo del estado del store
interface ErrorStore {
   errors: ApiError[]; // Lista de errores
   addError: (error: ApiError) => void; // Método para agregar errores
   clearErrors: () => void; // Método para limpiar errores
}

export const useErrorStore = create<ErrorStore>((set) => ({
   errors: [],
   addError: (error) => set((state) => ({ errors: [...state.errors, error] })),
   clearErrors: () => set({ errors: [] }),
}));
