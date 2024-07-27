"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { useThemeStore } from "@/store/themeStore";
import { Label } from "./label";
import { SnesInputPixelBorder, NesInputPixelBorder } from "./pixel-border";
type InputVariantsType = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariantsType["variant"];
  size?: InputVariantsType["size"];
}

const inputVariants = cva(
  "bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary text-primary-foreground",
        primary:
          "border-blue-400 ring-offset-blue-400 placeholder-blue-400 focus-visible:ring-blue-300",
        destructive:
          "border-red-500 ring-offset-red-500 placeholder-red-500 focus-visible:ring-red-300",
        outline:
          "border-white ring-offset-white placeholder-zinc-500 focus-visible:ring-zinc-950",
        secondary:
          "border-gray-300 ring-offset-gray-300 placeholder-gray-300 focus-visible:ring-gray-200",
        ghost:
          "border-transparent ring-offset-transparent placeholder-zinc-500 focus-visible:ring-zinc-950",
        link: "border-transparent text-blue-500 hover:underline focus-visible:ring-blue-300",
        success:
          "border-green-500 ring-offset-green-500 placeholder-green-500 focus-visible:ring-green-300",
        warning:
          "border-yellow-500 ring-offset-yellow-500 placeholder-yellow-500 focus-visible:ring-yellow-300",
        error:
          "border-red-500 ring-offset-red-500 placeholder-red-500 focus-visible:ring-red-300",
        disabled:
          "border-gray-300 cursor-not-allowed opacity-50 ring-offset-gray-300 placeholder-gray-300",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const pixelInputVariants = cva(
  "flex w-full px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 font-press relative bg-background ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 ",
  {
    variants: {
      variant: {
        default: "bg-background",
        primary:
          "border-blue-400 ring-offset-blue-400 placeholder-blue-200 focus-visible:ring-blue-300",
        destructive:
          "border-red-500 ring-offset-red-500 placeholder-red-200 focus-visible:ring-red-300",
        outline:
          "border-white ring-offset-white placeholder-zinc-500 focus-visible:ring-zinc-950",
        secondary:
          "border-gray-300 ring-offset-gray-300 placeholder-gray-200 focus-visible:ring-gray-200",
        ghost:
          "border-transparent ring-offset-transparent placeholder-zinc-500 focus-visible:ring-zinc-950",
        link: "text-blue-500 border-transparent hover:underline focus-visible:ring-blue-300",
        success:
          "border-green-500 ring-offset-green-500 placeholder-green-200 focus-visible:ring-green-300",
        warning:
          "border-yellow-500 ring-offset-yellow-500 placeholder-yellow-200 focus-visible:ring-yellow-300",
        error:
          "border-red-500 ring-offset-red-500 placeholder-red-200 focus-visible:ring-red-300",
        disabled:
          "cursor-not-allowed border-gray-300 opacity-50 ring-offset-gray-300 placeholder-gray-200",
      },
      size: {
        xs: "h-7 text-xs",
        sm: "h-8 text-sm",
        md: "h-10 text-base",
        lg: "h-12 text-lg",
        xl: "h-14 text-xl",
      },
      pixelTheme: {
        nes: "border-4",
        snes: "border-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pixelTheme: "nes",
    },
  }
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    const { theme } = useThemeStore();
    const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");
    const pixelTheme = theme.startsWith("nes") ? "nes" : "snes";

    const inputClass = cn(
      isPixelTheme
        ? pixelInputVariants({ variant, size, pixelTheme })
        : inputVariants({ variant, size }),
      className
    );

    return (
      <div>
        <Label>{props.placeholder}</Label>
        <div className="relative">
          <input type={type} className={inputClass} ref={ref} {...props} />
          {isPixelTheme && (
            <>
              {pixelTheme === "nes" ? (
                <NesInputPixelBorder />
              ) : (
                <SnesInputPixelBorder />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
