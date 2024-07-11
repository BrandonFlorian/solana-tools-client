"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/themeStore";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
        error: "bg-red-500 text-white hover:bg-red-600",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
      size: {
        icon: "h-9 w-9",
        xs: "h-7 px-2 rounded-md",
        sm: "h-8 px-3 rounded-md",
        md: "h-9 px-4 rounded-md",
        lg: "h-10 px-6 rounded-md",
        xl: "h-12 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const nesButtonVariants = cva(
  "relative font-press transition-colors focus-visible:outline-none disabled:opacity-50 border-4 active:translate-x-[2px] active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "bg-blue-400 text-black hover:bg-blue-500",
        destructive: "bg-red-500 text-white  hover:bg-red-600",
        outline: "bg-white text-black hover:bg-gray-100",
        secondary: "bg-gray-300 text-black hover:bg-gray-400",
        ghost:
          "bg-transparent text-black border-transparent shadow-none hover:bg-gray-100",
        link: "bg-transparent text-blue-500 border-transparent shadow-none hover:underline",
        success: "bg-green-500 text-white  hover:bg-green-600",
        warning: "bg-yellow-500 text-black  hover:bg-yellow-600",
        error: "bg-red-500 text-white hover:bg-red-600",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
      size: {
        icon: "h-9 w-9",
        xs: "h-7 px-2",
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-10 px-6",
        xl: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const snesButtonVariants = cva(
  "relative font-press transition-colors focus-visible:outline-none disabled:opacity-50 border-2 active:translate-x-[2px] active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "bg-blue-400 text-black hover:bg-blue-500",
        destructive: "bg-red-500 text-white  hover:bg-red-600",
        outline: "bg-white text-black hover:bg-gray-100",
        secondary: "bg-gray-300 text-black hover:bg-gray-400",
        ghost:
          "bg-transparent text-black border-transparent shadow-none hover:bg-gray-100",
        link: "bg-transparent text-blue-500 border-transparent shadow-none hover:underline",
        success: "bg-green-500 text-white  hover:bg-green-600",
        warning: "bg-yellow-500 text-black  hover:bg-yellow-600",
        error: "bg-red-500 text-white hover:bg-red-600",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
      size: {
        icon: "h-9 w-9",
        xs: "h-7 px-2",
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-10 px-6",
        xl: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { theme } = useThemeStore();
    const isNes = theme.startsWith("nes");
    const isSnes = theme.startsWith("snes");
    const buttonClass = cn(
      theme.startsWith("nes")
        ? nesButtonVariants({ variant, size })
        : theme.startsWith("snes")
        ? snesButtonVariants({ variant, size })
        : buttonVariants({ variant, size }),
      className
    );
    console.log("isNes", isNes);
    console.log("isSnes", isSnes);

    return (
      <Comp className={buttonClass} ref={ref} {...props}>
        {isNes && (
          <>
            <span className="absolute top-[-4px] left-[-4px] w-[4px] h-[4px] bg-background" />
            <span className="absolute top-[-4px] right-[-4px] w-[4px] h-[4px] bg-background" />
            <span className="absolute bottom-[-4px] left-[-4px] w-[4px] h-[4px] bg-background" />
            <span className="absolute bottom-[-4px] right-[-4px] w-[4px] h-[4px] bg-background" />
            <span className="absolute right-0 top-[1px] bottom-[4px] w-[4px] bg-black/20" />
            <span className="absolute bottom-0 left-[1px] right-[1px] h-[4px] bg-black/20" />
          </>
        )}
        {isSnes && (
          <>
            <span className="absolute top-[-2px] left-[-2px] w-[2px] h-[2px] bg-background" />
            <span className="absolute top-[-2px] right-[-2px] w-[2px] h-[2px] bg-background" />
            <span className="absolute bottom-[-2px] left-[-2px] w-[2px] h-[2px] bg-background" />
            <span className="absolute bottom-[-2px] right-[-2px] w-[2px] h-[2px] bg-background" />
            <span className="absolute right-0 top-[2px] bottom-[2px] w-[2px] bg-black/20" />
            <span className="absolute bottom-0 left-[2px] right-[2px] h-[2px] bg-black/20" />
          </>
        )}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
