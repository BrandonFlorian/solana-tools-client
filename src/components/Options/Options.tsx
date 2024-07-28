"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/themeStore";
import { Sun, Moon, Lightbulb } from "lucide-react";

const ThemeOption = ({
  theme,
  label,
  icon: Icon,
}: {
  theme: string;
  label: string;
  icon: React.ElementType;
}) => {
  const { theme: currentTheme, setTheme } = useThemeStore();

  const handleThemeChange = () => {
    let newTheme = theme;

    if (theme === "light" || theme === "dark") {
      // For light/dark toggle, maintain the current style (modern, nes, snes)
      const currentStyle = currentTheme.startsWith("nes")
        ? "nes"
        : currentTheme.startsWith("snes")
        ? "snes"
        : "";
      newTheme = currentStyle ? `${currentStyle}-${theme}` : theme;
    } else if (theme === "modern") {
      // For modern, switch to basic light/dark
      newTheme = currentTheme.includes("dark") ? "dark" : "light";
    } else {
      // For nes/snes, maintain current light/dark setting
      const isDark = currentTheme.endsWith("dark");
      newTheme = `${theme}-${isDark ? "dark" : "light"}`;
    }

    setTheme(newTheme as any);
  };

  const isActive = () => {
    if (theme === "light" || theme === "dark") {
      return currentTheme.endsWith(theme);
    } else if (theme === "modern") {
      return !currentTheme.includes("nes") && !currentTheme.includes("snes");
    } else {
      return currentTheme.startsWith(theme);
    }
  };

  return (
    <Button
      variant={isActive() ? "default" : "outline"}
      className="w-full justify-start"
      onClick={handleThemeChange}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};

export const OptionsThemeSelector = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Theme Options</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          <ThemeOption theme="light" label="Light" icon={Sun} />
          <ThemeOption theme="dark" label="Dark" icon={Moon} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ThemeOption theme="modern" label="Modern" icon={Lightbulb} />
          <ThemeOption theme="nes" label="NES" icon={Lightbulb} />
          <ThemeOption theme="snes" label="SNES" icon={Lightbulb} />
        </div>
      </CardContent>
    </Card>
  );
};
