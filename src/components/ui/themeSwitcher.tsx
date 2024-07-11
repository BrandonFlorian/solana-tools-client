"use client";
import React from "react";
import { useThemeStore } from "@/store/themeStore";
import { Button } from "@/components/ui/button";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex space-x-2">
      <Button
        onClick={() => setTheme("light")}
        variant={theme === "light" ? "default" : "outline"}
      >
        Light
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        variant={theme === "dark" ? "default" : "outline"}
      >
        Dark
      </Button>
      <Button
        onClick={() => setTheme("nes-light")}
        variant={theme === "nes-light" ? "default" : "outline"}
      >
        NES Light
      </Button>
      <Button
        onClick={() => setTheme("nes-dark")}
        variant={theme === "nes-dark" ? "default" : "outline"}
      >
        NES Dark
      </Button>
      <Button
        onClick={() => setTheme("snes-light")}
        variant={theme === "snes-light" ? "default" : "outline"}
      >
        SNES Light
      </Button>
      <Button
        onClick={() => setTheme("snes-dark")}
        variant={theme === "snes-dark" ? "default" : "outline"}
      >
        SNES Dark
      </Button>
    </div>
  );
};
