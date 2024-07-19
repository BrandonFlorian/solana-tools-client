"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { useThemeStore } from "@/store/themeStore";

export interface PixelBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  invertColors?: boolean;
}

const PixelBorder = React.forwardRef<HTMLDivElement, PixelBorderProps>(
  ({ className, asChild = false, invertColors = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const { theme } = useThemeStore();
    const isNes = theme.startsWith("nes");
    const isSnes = theme.startsWith("snes");
    const borderColor = invertColors ? "bg-text" : "bg-background";

    console.log("isNes", isNes);
    console.log("isSnes", isSnes);

    return (
      <Comp>
        <div>
          {isNes && (
            <>
              <span
                className={`absolute top-[-4px] left-[-4px] w-[4px] h-[4px] ${borderColor}`}
              />
              <span
                className={`absolute top-[-4px] right-[-4px] w-[4px] h-[4px] ${borderColor}`}
              />
              <span
                className={`absolute bottom-[-4px] left-[-4px] w-[4px] h-[4px] ${borderColor}`}
              />
              <span
                className={`absolute bottom-[-4px] right-[-4px] w-[4px] h-[4px] ${borderColor}`}
              />
            </>
          )}
          {isSnes && (
            <>
              <span
                className={`absolute top-[-2px] left-[-2px] w-[2px] h-[2px] ${borderColor}`}
              />
              <span
                className={`absolute top-[-2px] right-[-2px] w-[2px] h-[2px] ${borderColor}`}
              />
              <span
                className={`absolute bottom-[-2px] left-[-2px] w-[2px] h-[2px] ${borderColor}`}
              />
              <span
                className={`absolute bottom-[-2px] right-[-2px] w-[2px] h-[2px] ${borderColor}`}
              />
            </>
          )}
          {props.children}
        </div>
      </Comp>
    );
  }
);
PixelBorder.displayName = "PixelBorder";

export { PixelBorder };
