"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { useThemeStore } from "@/store/themeStore";

const cardVariants = cva(
  "rounded-lg border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-black",
        error: "bg-red-500 text-white",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const pixelCardVariants = cva(
  "border border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-red-500 text-white",
        outline: "bg-white text-black",
        secondary: "bg-gray-300 text-black",
        ghost: "bg-transparent text-black",
        link: "bg-transparent text-blue-500",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-black",
        error: "bg-red-500 text-white",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
      pixelTheme: {
        nes: "border-4",
        snes: "border-2",
      },
    },
    defaultVariants: {
      variant: "default",
      pixelTheme: "nes",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    const { theme } = useThemeStore();
    const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");
    const pixelTheme = theme.startsWith("nes") ? "nes" : "snes";

    return (
      <div
        ref={ref}
        className={cn(
          isPixelTheme
            ? pixelCardVariants({ variant, pixelTheme })
            : cardVariants({ variant }),
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
