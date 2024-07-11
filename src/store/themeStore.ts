import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme =
  | "light"
  | "dark"
  | "nes-light"
  | "nes-dark"
  | "snes-light"
  | "snes-dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);
