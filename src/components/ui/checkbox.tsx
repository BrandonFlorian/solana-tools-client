"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useThemeStore } from "@/store/themeStore";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-zinc-200 border-zinc-900 ring-offset-white data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50 dark:border-zinc-800 dark:border-zinc-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900",
        primary:
          "border-blue-500 text-blue-500 focus-visible:ring-blue-500 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white dark:border-blue-400 dark:border-blue-500 dark:ring-offset-blue-500 dark:focus-visible:ring-blue-500 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:text-white",
        destructive:
          "border-red-500 text-red-500 focus-visible:ring-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white dark:border-red-500 dark:border-red-500 dark:ring-offset-red-500 dark:focus-visible:ring-red-500 dark:data-[state=checked]:bg-red-500 dark:data-[state=checked]:text-white",
        outline:
          "border-zinc-200 text-zinc-900 focus-visible:ring-zinc-950 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50 dark:border-zinc-800 dark:border-zinc-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900",
        secondary:
          "border-gray-300 text-gray-700 focus-visible:ring-gray-500 data-[state=checked]:bg-gray-500 data-[state=checked]:text-white dark:border-gray-300 dark:border-gray-300 dark:ring-offset-gray-300 dark:focus-visible:ring-gray-500 dark:data-[state=checked]:bg-gray-500 dark:data-[state=checked]:text-white",
        ghost:
          "border-transparent text-zinc-900 focus-visible:ring-zinc-950 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50 dark:border-transparent dark:border-transparent dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900",
        link: "border-transparent text-blue-500 focus-visible:ring-blue-500 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white dark:border-transparent dark:border-blue-400 dark:ring-offset-blue-500 dark:focus-visible:ring-blue-500 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:text-white",
      },
      size: {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const pixelCheckboxVariants = cva(
  "peer shrink-0 border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-press ",
  {
    variants: {
      variant: {
        default:
          "border-zinc-200 border-zinc-900 ring-offset-white data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50 dark:border-zinc-800 dark:border-zinc-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900",
        primary:
          "border-blue-500 text-blue-500 dark:border-blue-400 dark:border-blue-500 dark:ring-offset-blue-500 dark:focus-visible:ring-blue-500 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:text-white",
        destructive:
          "border-red-500 text-red-500 dark:border-red-500 dark:border-red-500 dark:ring-offset-red-500 dark:focus-visible:ring-red-500 dark:data-[state=checked]:bg-red-500 dark:data-[state=checked]:text-white",
        outline:
          "border-zinc-950 text-zinc-950 dark:border-zinc-950 dark:border-zinc-950 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900",
        secondary:
          "border-gray-700 text-gray-700 dark:border-gray-300 dark:border-gray-300 dark:ring-offset-gray-300 dark:focus-visible:ring-gray-500 dark:data-[state=checked]:bg-gray-500 dark:data-[state=checked]:text-white",
        ghost:
          "border-transparent text-zinc-950 dark:border-transparent dark:border-transparent dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900",
        link: "border-transparent text-blue-500 dark:border-transparent dark:border-blue-400 dark:ring-offset-blue-500 dark:focus-visible:ring-blue-500 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:text-white",
      },
      size: {
        default: "h-6 w-6",
        sm: "h-4 w-4",
        lg: "h-8 w-8",
      },
      pixelTheme: {
        nes: "border-4",
        snes: "border-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      pixelTheme: "nes",
    },
  }
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, ...props }, ref) => {
  const { theme } = useThemeStore();
  const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");
  const pixelTheme = theme.startsWith("nes") ? "nes" : "snes";

  const checkboxClass = cn(
    isPixelTheme
      ? pixelCheckboxVariants({ variant, size, pixelTheme })
      : checkboxVariants({ variant, size }),
    className
  );

  return (
    <CheckboxPrimitive.Root ref={ref} className={checkboxClass} {...props}>
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className={cn(isPixelTheme ? "h-3 w-3" : "h-4 w-4")} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
