"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { useThemeStore } from "@/store/themeStore";
import { Label } from "./label";
type InputVariantsType = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariantsType["variant"];
  size?: InputVariantsType["size"];
}

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default: "border-primary text-primary-foreground hover:bg-primary/90",
        primary: "border-blue-400 text-black hover:bg-blue-500",
        destructive: "border-red-500 text-white hover:bg-red-600",
        outline: "border-white text-black hover:bg-gray-100",
        secondary: "border-gray-300 text-black hover:bg-gray-400",
        ghost: "border-transparent text-black hover:bg-gray-100",
        link: "border-transparent text-blue-500 hover:underline",
        success: "border-green-500 text-white hover:bg-green-600",
        warning: "border-yellow-500 text-black hover:bg-yellow-600",
        error: "border-red-500 text-white hover:bg-red-600",
        disabled: "border-gray-300 text-gray-500 cursor-not-allowed",
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
  "flex w-full px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 font-press relative ",
  {
    variants: {
      variant: {
        default: "",
        primary: "text-black",
        destructive: "text-white",
        outline: "text-black",
        secondary: "text-black",
        ghost: "text-black",
        link: "text-blue-500",
        success: "text-white",
        warning: "text-black",
        error: "text-white",
        disabled: "text-gray-500 cursor-not-allowed",
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

    const cornerValue = pixelTheme === "nes" ? "1" : "0.5";

    return (
      <div>
        <Label>{props.placeholder}</Label>
        <div className="relative">
          <input type={type} className={inputClass} ref={ref} {...props} />
          {/* needed to create this separately as the PixelBorder component would not work properly with the input */}
          {isPixelTheme && (
            <>
              <span
                className={`absolute top-0 left-0 w-${cornerValue} h-${cornerValue}  bg-background`}
              />
              <span
                className={`absolute top-0 right-0 w-${cornerValue} h-${cornerValue} bg-background`}
              />
              <span
                className={`absolute bottom-0 left-0 w-${cornerValue} h-${cornerValue} bg-background`}
              />
              <span
                className={`absolute bottom-0 right-0 w-${cornerValue} h-${cornerValue} bg-background`}
              />
            </>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
