import { create } from "zustand";

interface MenuState {
  header: string;
  setHeader: (header: string) => void;
  getHeader: () => string;
}

export const useMenuStore = create<MenuState>()((set, get) => ({
  header: "",
  setHeader: (header: string) => {
    if (get().header !== header) {
      set({ header });
    }
  },
  getHeader: () => get().header,
}));
