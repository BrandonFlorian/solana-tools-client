"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/themeStore";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
        muted: "text-muted-foreground",
      },
      size: {
        default: "text-sm",
        xs: "text-xs",
        sm: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const pixelLabelVariants = cva(
  "font-press leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        destructive: "text-destructive",
        muted: "text-muted-foreground",
      },
      size: {
        default: "text-sm",
        xs: "text-xs",
        sm: "text-sm",
        lg: "text-lg",
        xl: "text-xl",
      },
      pixelTheme: {
        nes: "",
        snes: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      pixelTheme: "nes",
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, ...props }, ref) => {
  const { theme } = useThemeStore();
  const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");
  const pixelTheme = theme.startsWith("nes") ? "nes" : "snes";

  const labelClass = cn(
    isPixelTheme
      ? pixelLabelVariants({ variant, size, pixelTheme })
      : labelVariants({ variant, size }),
    className
  );

  return <LabelPrimitive.Root ref={ref} className={labelClass} {...props} />;
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
