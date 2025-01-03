import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserType } from "@/vite-env";

interface AuthStore {
   user: UserType | null;
   setUser: (user: UserType | null) => void;
   getToken: () => string | null;
}

// Guardamos el estado en el localStorage
export const useAuthStore = create(
   persist<AuthStore>(
      (set, get) => {
         return {
            user: null,
            setUser: (user) => {
               set({ user });
            },
            getToken: () => {
               return get().user?.token || null;
            },
         };
      },
      { name: "auth-storage" }
   )
);
