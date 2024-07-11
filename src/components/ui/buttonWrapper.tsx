"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { useThemeStore } from "@/store/themeStore";

export interface ButtonWrapperProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const ButtonWrapper = React.forwardRef<HTMLDivElement, ButtonWrapperProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    const { theme } = useThemeStore();
    const isNes = theme.startsWith("nes");
    const isSnes = theme.startsWith("snes");

    console.log("isNes", isNes);
    console.log("isSnes", isSnes);

    return (
      <Comp>
        <div>
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
        </div>
      </Comp>
    );
  }
);
ButtonWrapper.displayName = "ButtonWrapper";

export { ButtonWrapper };
