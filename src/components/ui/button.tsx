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

const pixelButtonVariants = cva(
  "relative font-press transition-colors focus-visible:outline-none disabled:opacity-50 items-center justify-center inline-flex",
  {
    variants: {
      variant: {
        default: "bg-blue-400 text-black hover:bg-blue-500",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "bg-white text-black hover:bg-gray-100",
        secondary: "bg-gray-300 text-black hover:bg-gray-400",
        ghost: "bg-transparent text-black hover:bg-gray-100",
        link: "bg-transparent text-blue-500 hover:underline",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
        error: "bg-red-500 text-white hover:bg-red-600",
        disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
      },
      size: {
        icon: "p-2",
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
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

const innerPadding = {
  icon: "px-2 py-2",
  xs: "px-2 py-1",
  sm: "px-3 py-1",
  md: "px-4 py-2",
  lg: "px-6 py-2",
  xl: "px-8 py-3",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { theme } = useThemeStore();
    const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");
    const pixelTheme = theme.startsWith("nes") ? "nes" : "snes";
    const isNes = theme.startsWith("nes");
    const isSnes = theme.startsWith("snes");

    const [isPressed, setIsPressed] = React.useState(false);

    const buttonClass = cn(
      isPixelTheme
        ? pixelButtonVariants({ variant, size, pixelTheme })
        : buttonVariants({ variant, size }),
      className
    );

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsPressed(false);

    if (isPixelTheme) {
      return (
        <Comp
          className={buttonClass}
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center transform active:translate-x-[2px] active:translate-y-[2px] p-2">
            {props.children}
          </span>
          {/* Cut corners */}
          {isNes && (
            <>
              <span className="absolute top-[-4px] left-[-4px] w-[4px] h-[4px] bg-background" />
              <span className="absolute top-[-4px] right-[-4px] w-[4px] h-[4px] bg-background" />
              <span className="absolute bottom-[-4px] left-[-4px] w-[4px] h-[4px] bg-background" />
              <span className="absolute bottom-[-4px] right-[-4px] w-[4px] h-[4px] bg-background" />
              <span
                className={cn(
                  "absolute",
                  isPressed
                    ? "left-0 top-[0px] bottom-[1px] w-[4px] bg-black/20"
                    : "right-0 top-[1px] bottom-[4px] w-[4px] bg-black/20"
                )}
              />
              <span
                className={cn(
                  "absolute",
                  isPressed
                    ? "top-0 left-[4px] right-[1px] h-[4px] bg-black/20"
                    : "bottom-0 left-[1px] right-[0px] h-[4px] bg-black/20"
                )}
              />
            </>
          )}
          {isSnes && (
            <>
              <span className="absolute top-[-2px] left-[-2px] w-[2px] h-[2px] bg-background" />
              <span className="absolute top-[-2px] right-[-2px] w-[2px] h-[2px] bg-background" />
              <span className="absolute bottom-[-2px] left-[-2px] w-[2px] h-[2px] bg-background" />
              <span className="absolute bottom-[-2px] right-[-2px] w-[2px] h-[2px] bg-background" />
              <span
                className={cn(
                  "absolute",
                  isPressed
                    ? "left-0 top-[0px] bottom-[1px] w-[2px] bg-black/20"
                    : "right-0 top-[1px] bottom-[2px] w-[2px] bg-black/20"
                )}
              />
              <span
                className={cn(
                  "absolute ",
                  isPressed
                    ? "top-0 left-[2px] right-[1px] h-[2px] bg-black/20"
                    : "bottom-0 left-[1px] right-[0px] h-[2px] bg-black/20"
                )}
              />
            </>
          )}
        </Comp>
      );
    }

    return (
      <Comp className={buttonClass} ref={ref} {...props}>
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
