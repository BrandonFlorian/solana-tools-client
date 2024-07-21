"use client";
import { useThemeStore } from "@/store/themeStore";
import * as React from "react";
import { useEffect, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

export default function RootStyleRegistry({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useThemeStore((state) => state.theme);

  const rpc = process.env.NEXT_PUBLIC_RPC_URL;
  const endpoint = useMemo(
    () => rpc ?? "https://api.mainnet-beta.solana.com",
    [rpc]
  );

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(
      "light",
      "dark",
      "nes-light",
      "nes-dark",
      "snes-light",
      "snes-dark"
    );
    root.classList.add(theme);
  }, [theme]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
