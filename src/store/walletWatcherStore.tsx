import { mockWallets } from "@/config/mockWalletData";
import { create } from "zustand";
interface Position {
  tokenAddress: string;
  invested: number;
  currentValue: number;
}

interface WalletInfo {
  address: string;
  bidAmount: number;
  isCopyTradingEnabled: boolean;
  balance: number;
  positions: Position[];
}

interface WalletWatcherStore {
  trackedWallets: WalletInfo[];
  addWallet: (address: string, bidAmount: number) => void;
  removeWallet: (address: string) => void;
  updateWallet: (address: string, updates: Partial<WalletInfo>) => void;
  sellAllPositions: (address: string) => void;
  sellPosition: (address: string, tokenAddress: string) => void;
  abortTracking: (address: string) => void;
  updateWalletBalance: (address: string, balance: number) => void;
  updatePosition: (address: string, position: Position) => void;
}

export const useWalletWatcherStore = create<WalletWatcherStore>((set, get) => ({
  trackedWallets: mockWallets || [],
  addWallet: (address, bidAmount) =>
    set((state) => ({
      trackedWallets: [
        ...state.trackedWallets,
        {
          address,
          bidAmount,
          isCopyTradingEnabled: true,
          balance: 0,
          positions: [],
        },
      ],
    })),
  removeWallet: (address) =>
    set((state) => ({
      trackedWallets: state.trackedWallets.filter((w) => w.address !== address),
    })),
  updateWallet: (address, updates) =>
    set((state) => ({
      trackedWallets: state.trackedWallets.map((w) =>
        w.address === address ? { ...w, ...updates } : w
      ),
    })),
  sellAllPositions: (address) => {
    // TODO: Implement backend communication to sell all positions
    console.log(`Selling all positions for ${address}`);
  },
  sellPosition: (address, tokenAddress) => {
    // TODO: Implement backend communication to sell a specific position
    console.log(`Selling position ${tokenAddress} for ${address}`);
  },
  abortTracking: (address) => {
    // TODO: Implement backend communication to abort tracking
    console.log(`Aborting tracking for ${address}`);
    get().removeWallet(address);
  },
  updateWalletBalance: (address, balance) =>
    set((state) => ({
      trackedWallets: state.trackedWallets.map((wallet) =>
        wallet.address === address ? { ...wallet, balance } : wallet
      ),
    })),
  updatePosition: (address, position) =>
    set((state) => ({
      trackedWallets: state.trackedWallets.map((wallet) =>
        wallet.address === address
          ? {
              ...wallet,
              positions: wallet.positions.some(
                (pos) => pos.tokenAddress === position.tokenAddress
              )
                ? wallet.positions.map((pos) =>
                    pos.tokenAddress === position.tokenAddress ? position : pos
                  )
                : [...wallet.positions, position],
            }
          : wallet
      ),
    })),
}));
