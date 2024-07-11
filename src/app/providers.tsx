"use client";
import { useThemeStore } from "@/store/themeStore";
import * as React from "react";
import { useEffect } from "react";
export default function RootStyleRegistry({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(
      "light",
      "dark",
      "nes-light",
      "nes-dark",
      "snes-light",
      "snes-dark"
    );
    root.classList.add(theme);
  }, [theme]);
  return <div>{children}</div>;
}
