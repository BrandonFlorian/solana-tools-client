"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { useThemeStore } from "@/store/themeStore";
import { PixelBorder } from "./pixel-border";

const selectTriggerVariants = cva(
  "inline-flex border items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        primary: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline:
          "border border-input bg-background hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-black",
        error: "bg-red-500 text-white",
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

const selectItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default:
          "hover:bg-primary/90 focus:bg-primary/90 focus:text-primary-foreground dark:focus:bg-primary/90 dark:focus:text-primary-foreground",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 focus:text-primary-foreground dark:focus:bg-primary/90 dark:focus:text-primary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:bg-destructive/90 focus:text-destructive-foreground dark:focus:bg-destructive/90 dark:focus:text-destructive-foreground",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:focus:bg-accent dark:focus:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:bg-secondary/80 focus:text-secondary-foreground dark:focus:bg-secondary/80 dark:focus:text-secondary-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:focus:bg-accent dark:focus:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline focus:underline dark:focus:underline",
        success:
          "bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 dark:focus:bg-green-600",
        warning:
          "bg-yellow-500 text-black hover:bg-yellow-600 focus:bg-yellow-600 dark:focus:bg-yellow-600",
        error:
          "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 dark:focus:bg-red-600",
        disabled:
          "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800",
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

const pixelSelectTriggerVariants = cva(
  "relative font-press flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        primary: "bg-primary text-primary-foreground ",
        destructive:
          "bg-red-500 text-white focus:bg-red-600 dark:focus:bg-red-600 dark:focus:text-white dark:hover:text-white",
        outline:
          "bg-white text-black focus:bg-gray-100 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",
        secondary:
          "bg-gray-300 text-black  focus:bg-gray-400 dark:focus:bg-gray-400 dark:focus:text-black",
        ghost:
          "bg-transparent text-black focus:bg-gray-100 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",
        link: "bg-transparent text-blue-500 hover:underline focus:underline dark:focus:underline dark:hover:underline",
        success:
          "bg-green-500 text-white focus:bg-green-600 dark:focus:bg-green-600 dark:focus:text-white",
        warning:
          "bg-yellow-500 text-black focus:bg-yellow-600 dark:focus:bg-yellow-600 dark:focus:text-black",
        error:
          "bg-red-500 text-white focus:bg-red-600 dark:focus:bg-red-600 dark:focus:text-white",
        disabled:
          "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 dark:focus:hover:bg-zinc-800 dark:focus:hover:text-zinc-50",
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

const pixelSelectItemVariants = cva(
  "relative font-press flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default:
          "hover:bg-primary/90 focus:bg-primary/90 focus:text-primary-foreground dark:focus:bg-primary/90 dark:focus:text-primary-foreground",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 focus:text-primary-foreground dark:focus:bg-primary/90 dark:focus:text-primary-foreground",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 dark:focus:bg-red-600 dark:focus:text-white",
        outline:
          "bg-white text-black hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",
        secondary:
          "bg-gray-300 text-black hover:bg-gray-400 focus:bg-gray-400 dark:focus:bg-gray-400 dark:focus:text-black",
        ghost:
          "bg-transparent text-black hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",
        link: "bg-transparent text-blue-500 hover:underline focus:underline dark:focus:underline dark:hover:underline",
        success:
          "bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 dark:focus:bg-green-600 dark:focus:text-white",
        warning:
          "bg-yellow-500 text-black hover:bg-yellow-600 focus:bg-yellow-600 dark:focus:bg-yellow-600 dark:focus:text-black",
        error:
          "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 dark:focus:bg-red-600 dark:focus:text-white",
        disabled:
          "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800",
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
        nes: "",
        snes: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      pixelTheme: "nes",
    },
  }
);

const selectContentVariants = cva(
  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border border-border",
        primary: "bg-primary text-primary-foreground border border-primary",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive",
        outline: "bg-background text-foreground border border-input",
        secondary:
          "bg-secondary text-secondary-foreground border border-secondary",
        ghost: "bg-transparent",
        link: "bg-background text-foreground underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const pixelSelectContentVariants = cva(
  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden font-press shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground border-4 border-primary",
        destructive:
          "bg-destructive text-destructive-foreground border-4 border-red-500",
        outline: "bg-background text-foreground border-4 border-input",
        secondary:
          "bg-secondary text-secondary-foreground border-4 border-gray-300",
        ghost: "bg-transparent",
        link: "bg-background text-foreground underline-offset-4 hover:underline border-4 border-blue-500",
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

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, size, children, ...props }, ref) => {
  const { theme } = useThemeStore();
  const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");
  const pixelTheme = theme.startsWith("nes") ? "nes" : "snes";

  const variantClasses = isPixelTheme
    ? pixelSelectTriggerVariants({ variant, size, pixelTheme })
    : selectTriggerVariants({ variant, size });

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(variantClasses, "w-full justify-between", className)}
      {...props}
    >
      <PixelBorder>{children}</PixelBorder>
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof selectContentVariants> {}
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", variant, ...props }, ref) => {
  const { theme } = useThemeStore();
  const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");
  const pixelTheme = theme.startsWith("nes") ? "nes" : "snes";

  const contentVariants = isPixelTheme
    ? pixelSelectContentVariants({ variant, pixelTheme })
    : selectContentVariants({ variant });

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          contentVariants,
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  const { theme } = useThemeStore();
  const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");

  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        "py-1.5 pl-8 pr-2 text-sm font-semibold",
        isPixelTheme && "font-press",
        className
      )}
      {...props}
    />
  );
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
    VariantProps<typeof selectItemVariants> {}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, variant, size, ...props }, ref) => {
  const { theme } = useThemeStore();
  const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");
  const pixelTheme = theme.startsWith("nes") ? "nes" : "snes";

  const variantClasses = isPixelTheme
    ? pixelSelectItemVariants({ variant, size, pixelTheme })
    : selectItemVariants({ variant, size });

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(variantClasses, className)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <PixelBorder>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </PixelBorder>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
