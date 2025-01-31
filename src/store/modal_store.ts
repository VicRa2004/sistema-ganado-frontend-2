import { create } from "zustand";

interface ModalStore {
  modalType: string | null;
  openModal: (type: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modalType: null,
  openModal: (type: string) => set({ modalType: type }),
  closeModal: () => set({ modalType: null }),
}));
