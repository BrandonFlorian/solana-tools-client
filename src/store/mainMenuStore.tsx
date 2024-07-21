import { create } from "zustand";
import { playSound, soundConfig } from "@/utils/sound";

type Router = {
  push: (path: string) => void;
  back: () => void;
};

interface MenuState {
  selectedIndex: number;
  router: Router | null;
  currentPath: string;
  setSelectedIndex: (index: number) => void;
  setRouter: (router: Router) => void;
  setCurrentPath: (path: string) => void;
  handleMenuSelect: (path: string) => void;
  handleBack: () => void;
  initializeKeyboardListeners: () => () => void;
}

export const useMenuStore = create<MenuState>((set, get) => ({
  selectedIndex: 0,
  router: null,
  currentPath: "/",
  setSelectedIndex: (index: number) => set({ selectedIndex: index }),
  setRouter: (router: Router) => set({ router }),
  setCurrentPath: (path: string) => set({ currentPath: path }),
  handleMenuSelect: (path: string) => {
    console.log("Menu select:", path);
    playSound(soundConfig.sounds.confirm.src);
    const { router } = get();
    if (router) {
      router.push(path);
      set({ currentPath: path });
    }
  },
  handleBack: () => {
    console.log("Handle back called");
    const { router, currentPath } = get();
    if (router && currentPath !== "/") {
      playSound(soundConfig.sounds.cancel.src);
      router.push("/");
      set({ currentPath: "/" });
    }
  },
  initializeKeyboardListeners: () => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const {
        selectedIndex,
        setSelectedIndex,
        handleMenuSelect,
        handleBack,
        currentPath,
      } = get();

      if (currentPath === "/") {
        switch (event.key) {
          case "ArrowDown":
          case "s":
            setSelectedIndex((selectedIndex + 1) % menuItems.length);
            break;
          case "ArrowUp":
          case "w":
            setSelectedIndex(
              selectedIndex === 0 ? menuItems.length - 1 : selectedIndex - 1
            );
            break;
          case "Enter":
            handleMenuSelect(menuItems[selectedIndex].path);
            break;
        }
      } else if (event.key === "Escape") {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  },
}));

const menuItems = [
  { label: "Options", path: "/options" },
  { label: "Pump Screener", path: "/pumpscreener" },
  { label: "Wallet Tracker", path: "/wallet-tracker" },
  { label: "Testing Ground", path: "/testing" },
  { label: "Token Factory", path: "/token-factory" },
];
