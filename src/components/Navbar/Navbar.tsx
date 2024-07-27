"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeStore } from "@/store/themeStore";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/themeSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PixelBorder } from "@/components/ui/pixel-border";
import { User } from "lucide-react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Pumpscreener", href: "/pumpscreener" },
  { name: "Wallet Tracker", href: "/wallet-tracker" },
  { name: "Options", href: "/options" },
];

const Navbar: React.FC = () => {
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  const WalletDisconnectButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
    { ssr: false }
  );
  const pathname = usePathname();
  const { theme } = useThemeStore();
  const { connected } = useWallet();
  const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <PixelBorder className="mr-2">
              <span className="text-xl font-bold">Logo</span>
            </PixelBorder>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground "
                    }  text-sm font-medium`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-4">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
          <div>
            {connected ? (
              <WalletDisconnectButtonDynamic style={buttonStyles} />
            ) : (
              <WalletMultiButtonDynamic style={buttonStyles} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const buttonStyles = {
  backgroundColor: "#ab9ff2",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: 0,
  border: "1px solid gray",
  fontFamily: "inherit",
};
