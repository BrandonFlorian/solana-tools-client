// store/walletTrackerStore.ts
import { API_BASE_URL } from "@/config/constants";
import { get } from "http";
import { create } from "zustand";

export interface CopyTradeSettings {
  user_id: string;
  tracked_wallet_id: string;
  is_enabled: boolean;
  trade_amount_sol?: number;
  max_slippage?: number;
}

export interface BuyTokenRequest {
  dex_type: string;
  token_address: string;
  amount_sol: number;
  slippage: number;
}

export interface SellTokenRequest {
  dex_type: string;
  token_address: string;
  slippage: number;
  amount_tokens?: number;
}
export interface TrackedWallet {
  id: string;
  is_active: boolean;
  user_id: string;
  wallet_address: string;
}

export interface ServerWalletInfo {
  balance: number;
  tokens: {
    address: string;
    symbol: string;
    name: string;
    balance: number;
    metadataUri: string;
    decimals: number;
  }[];
}

export interface Transaction {
  id: number;
  user_id: string;
  tracked_wallet_id: string | null;
  signature: string;
  transaction_type: "buy" | "sell";
  token_address: string;
  amount: number;
  price_sol: number;
  timestamp: string;
}

export interface ClientTxInfo {
  signature: string;
  token_address: string;
  token_name: string;
  token_symbol: string;
  transaction_type: "BUY" | "SELL";
  amount_token: number;
  amount_sol: number;
  price_per_token: number;
  token_image_uri: string;
  market_cap: number;
  usd_market_cap: number;
  timestamp: number;
  seller: string;
  buyer: string;
}

export interface TradeNotification {
  type: "copy_trade_execution";
  trade_type: string;
  transaction_data: {
    signature: string;
    tokenAddress: string;
    tokenName: string;
    tokenSymbol: string;
    transactionType: "BUY" | "SELL";
    amountToken: number;
    amountSol: number;
    pricePerToken: number;
    tokenImageUri: string;
    marketCap: number;
    usdMarketCap: number;
    timestamp: number;
    seller: string;
    buyer: string;
  };
}

type Notification = TradeNotification; // Add other notification types here if needed

interface WalletTrackerState {
  trackedWallet: TrackedWallet | null;
  serverWallet: ServerWalletInfo | null;
  copyTradeSettings: CopyTradeSettings | null;
  recentTransactions: Transaction[];
  notifications: Notification[];
  setTrackedWallet: (wallet: TrackedWallet | null) => void;
  setServerWallet: (wallet: ServerWalletInfo | null) => void;
  setCopyTradeSettings: (settings: CopyTradeSettings | null) => void;
  setRecentTransactions: (transactions: Transaction[]) => void;
  addNotification: (notification: Notification) => void;
  addWallet: (wallet: TrackedWallet) => void;
  removeWallet: () => void;
  updateServerWallet: (updatedWallet: Partial<ServerWalletInfo>) => void;
  updateBidAmount: (newBidAmount: number) => void;
  addTransaction: (transaction: Transaction) => void;
  fetchServerWallet: () => void;
  fetchTrackedWallets: () => void;
  fetchTransactionHistory: () => void;
  addTrackedWallet: (address: string, solPerTrade: number) => Promise<void>;
  removeTrackedWallet: (address: string) => Promise<void>;
  updateTrackedWallet: (address: string, isActive: boolean) => Promise<void>;
  createCopyTradeSettings: (settings: CopyTradeSettings) => Promise<void>;
  updateCopyTradeSettings: (settings: CopyTradeSettings) => Promise<void>;
  deleteCopyTradeSettings: (trackedWalletId: string) => Promise<void>;
  fetchCopyTradeSettings: () => void;
  buyToken: (buyRequest: BuyTokenRequest) => Promise<void>;
  sellToken: (sellRequest: SellTokenRequest) => Promise<void>;
  error: string | null;
  isLoading: boolean;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useWalletTrackerStore = create<WalletTrackerState>((set) => ({
  trackedWallet: null,
  serverWallet: null,
  recentTransactions: [],
  copyTradeSettings: null,
  notifications: [],
  setTrackedWallet: (wallet) => set({ trackedWallet: wallet }),
  setServerWallet: (wallet) => set({ serverWallet: wallet }),
  setCopyTradeSettings: (settings) => set({ copyTradeSettings: settings }),
  setRecentTransactions: (transactions) =>
    set({ recentTransactions: transactions }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  addWallet: (wallet) => {
    set({
      trackedWallet: {
        id: wallet.id,
        is_active: wallet.is_active,
        user_id: wallet.user_id,
        wallet_address: wallet.wallet_address,
      },
    });
  },
  removeWallet: () => set({ trackedWallet: null }),

  updateServerWallet: (updatedWallet) =>
    set((state) => ({
      serverWallet: state.serverWallet
        ? { ...state.serverWallet, ...updatedWallet }
        : null,
    })),
  updateBidAmount: (newBidAmount) =>
    set((state) => ({
      trackedWallet: state.trackedWallet
        ? { ...state.trackedWallet, bidAmount: newBidAmount }
        : null,
    })),
  addTransaction: (transaction) =>
    set((state) => ({
      recentTransactions: [transaction, ...state.recentTransactions].slice(
        0,
        50
      ), // Keep only the 50 most recent transactions
    })),
  fetchServerWallet: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/server_wallet_metadata`);
      if (!response.ok) throw new Error("Failed to fetch server wallet");
      const data = await response.json();
      set({ serverWallet: data });
    } catch (error) {
      console.error("Error fetching server wallet:", error);
    }
  },

  addTrackedWallet: async (walletAddress: string, solPerTrade: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tracked_wallets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: walletAddress,
          is_active: false,
          sol_per_trade: solPerTrade,
        }),
      });
      if (!response.ok) throw new Error("Failed to add tracked wallet");
      return await response.json();
    } catch (error) {
      console.error("Error adding tracked wallet:", error);
    }
  },

  removeTrackedWallet: async (address: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/tracked_wallets/${address}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to remove tracked wallet");
      return await response.json();
    } catch (error) {
      console.error("Error removing tracked wallet:", error);
    }
  },

  updateTrackedWallet: async (address: string, isActive: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tracked_wallets`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: address, is_active: isActive }),
      });
      if (!response.ok) throw new Error("Failed to update tracked wallet");
      return await response.json();
    } catch (error) {
      console.error("Error updating tracked wallet:", error);
    }
  },

  fetchTrackedWallets: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tracked_wallets`);
      if (!response.ok) throw new Error("Failed to fetch tracked wallets");
      const data = await response.json();
      set((state) => ({
        trackedWallet: data.tracked_wallets[0] || null, // Assuming we're only tracking one wallet
      }));
    } catch (error) {
      console.error("Error fetching tracked wallets:", error);
      set({ error: "Failed to fetch tracked wallets" });
    }
  },
  fetchTransactionHistory: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transaction_history`);
      if (!response.ok) throw new Error("Failed to fetch transaction history");
      const data = await response.json();
      set({ recentTransactions: data });
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      set({ error: "Failed to fetch transaction history" });
    }
  },

  createCopyTradeSettings: async (settings: CopyTradeSettings) => {
    try {
      const response = await fetch(`${API_BASE_URL}/copy_trade_settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error("Failed to create copy trade settings");
      return await response.json();
    } catch (error) {
      console.error("Error creating copy trade settings:", error);
    }
  },

  updateCopyTradeSettings: async (settings: CopyTradeSettings) => {
    try {
      const response = await fetch(`${API_BASE_URL}/copy_trade_settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error("Failed to update copy trade settings");
      set({ copyTradeSettings: settings });
      return await response.json();
    } catch (error) {
      console.error("Error updating copy trade settings:", error);
    }
  },

  deleteCopyTradeSettings: async (trackedWalletId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/copy_trade_settings/${trackedWalletId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete copy trade settings");
      return await response.json();
    } catch (error) {
      console.error("Error deleting copy trade settings:", error);
    }
  },

  fetchCopyTradeSettings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/copy_trade_settings`);
      if (!response.ok) throw new Error("Failed to fetch copy trade settings");
      const data = await response.json();
      set({ copyTradeSettings: data.settings[0] });
    } catch (error) {
      console.error("Error fetching copy trade settings:", error);
      set({ error: "Failed to fetch copy trade settings" });
    }
  },

  buyToken: async (buyRequest: BuyTokenRequest) => {
    try {
      const response = await fetch(`${API_BASE_URL}/buy_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buyRequest),
      });
      if (!response.ok) throw new Error("Failed to buy token");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error buying token:", error);
    }
  },

  sellToken: async (sellRequest: SellTokenRequest) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sell_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sellRequest),
      });
      if (!response.ok) throw new Error("Failed to sell token");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error selling token:", error);
    }
  },
  error: null,
  isLoading: false,
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
