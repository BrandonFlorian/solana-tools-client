// store/walletTrackerStore.ts
import { toast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/config/constants";
import { create } from "zustand";

export interface CopyTradeSettings {
  user_id: string;
  tracked_wallet_id: string;
  is_enabled: boolean;
  trade_amount_sol?: number;
  max_slippage?: number;
  max_open_positions?: number;
  use_allowed_tokens?: boolean;
  allowed_tokens?: string[];
  match_sell_percentage?: boolean;
  min_sol_balance?: number;
  allow_additional_buys?: boolean;
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
export interface SellTransactionData {
  type: string;
  amount_tokens: number;
  slippage: number;
}

export interface SellTokeData {
  address: string;
  symbol: string;
  name: string;
}

export interface SellTransactionResponse {
  success: boolean;
  signature: string;
  token_data: SellTokeData;
  transaction_data: SellTransactionData;
}

export interface BuyTransactionData {
  type: string;
  amount_sol: number;
  slippage: number;
}

export interface BuyTokeData {
  address: string;
  symbol: string;
  name: string;
}

export interface BuyTransactionResponse {
  success: boolean;
  signature: string;
  token_data: BuyTokeData;
  transaction_data: BuyTransactionData;
}

export interface TrackedWallet {
  id: string;
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

export type NotificationType =
  | "copy_trade_execution"
  | "tracked_wallet_trade"
  | "server_wallet_trade"
  | "transaction_logged"
  | "tracked_wallet_change"
  | "copy_trade_settings_change";

export interface BaseNotification {
  type: NotificationType;
  timestamp: number;
}

export interface TradeNotification extends BaseNotification {
  type: "copy_trade_execution" | "tracked_wallet_trade";
  data: {
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
    seller: string;
    buyer: string;
  };
}

export interface ServerWalletTradeNotification extends BaseNotification {
  type: "server_wallet_trade";
  data: {
    signature: string;
    tokenAddress: string;
    tokenName: string;
    tokenSymbol: string;
    transactionType: "BUY" | "SELL";
    amount: number;
    price: number;
  };
}

export interface TransactionLoggedNotification extends BaseNotification {
  type: "transaction_logged";
  data: {
    signature: string;
    tokenAddress: string;
    transactionType: "BUY" | "SELL";
    amount: number;
    price: number;
  };
}

export interface TrackedWalletChangeNotification extends BaseNotification {
  type: "tracked_wallet_change";
  data: {
    oldWalletAddress: string;
    newWalletAddress: string;
  };
}

export interface CopyTradeSettingsNotification extends BaseNotification {
  type: "copy_trade_settings_change";
  data: CopyTradeSettings;
}

export type Notification =
  | TradeNotification
  | ServerWalletTradeNotification
  | TransactionLoggedNotification
  | TrackedWalletChangeNotification
  | CopyTradeSettingsNotification;

export interface UpdateTrackedWalletPayload {
  tracked_wallet_id: string;
  old_wallet_address: string;
  new_wallet_address: string;
}

export interface UpdateTrackedWalletResponse {
  success: boolean;
  new_tracked_wallet_id: string;
}

export interface UpdateCopyTradeSettingsResponse {
  success: boolean;
  settings_id: string;
}

export interface FetchTrackedWalletResponse {
  tracked_wallets: TrackedWalletResponse[];
}

export interface TrackedWalletResponse {
  id: string;
  wallet_address: string;
  is_active: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}
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
  addNotification: (notification: Omit<Notification, "timestamp">) => void;
  addWallet: (wallet: TrackedWallet) => void;
  removeWallet: () => void;
  updateServerWallet: (updatedWallet: Partial<ServerWalletInfo>) => void;
  updateBidAmount: (newBidAmount: number) => void;
  addTransaction: (transaction: Transaction) => void;
  fetchServerWallet: () => void;
  fetchTrackedWallets: () => void;
  fetchTransactionHistory: () => void;
  addTrackedWallet: (address: string) => Promise<void>;
  removeTrackedWallet: (address: string) => Promise<void>;
  updateTrackedWallet: (
    payload: UpdateTrackedWalletPayload
  ) => Promise<UpdateTrackedWalletResponse>;
  createCopyTradeSettings: (settings: CopyTradeSettings) => Promise<void>;
  updateCopyTradeSettings: (
    settings: CopyTradeSettings
  ) => Promise<UpdateCopyTradeSettingsResponse>;
  deleteCopyTradeSettings: (trackedWalletId: string) => Promise<void>;
  fetchCopyTradeSettings: () => void;
  buyToken: (buyRequest: BuyTokenRequest) => Promise<BuyTransactionResponse>;
  sellToken: (
    sellRequest: SellTokenRequest
  ) => Promise<SellTransactionResponse>;
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
  setRecentTransactions: (
    updater: Transaction[] | ((prev: Transaction[]) => Transaction[])
  ) =>
    set((state) => {
      const newTransactions =
        typeof updater === "function"
          ? updater(state.recentTransactions)
          : updater;
      return { recentTransactions: newTransactions.slice(0, 50) }; // Keep only the 50 most recent
    }),
  addNotification: (notification: Omit<Notification, "timestamp">) => {
    const notificationWithTimestamp = {
      ...notification,
      timestamp: Date.now(),
    };

    let toastMessage = "";
    if (
      notification.type === "copy_trade_execution" ||
      notification.type === "tracked_wallet_trade"
    ) {
      const convertedNotification: TradeNotification =
        notification as TradeNotification;
      toastMessage = `${convertedNotification.data.transactionType} ${convertedNotification.data.amountToken} ${convertedNotification.data.tokenSymbol} for ${convertedNotification.data.amountSol} SOL`;
    } else if (notification.type === "server_wallet_trade") {
      const convertedNotification: ServerWalletTradeNotification =
        notification as ServerWalletTradeNotification;
      toastMessage = `${convertedNotification.data.transactionType} ${convertedNotification.data.amount} ${convertedNotification.data.tokenSymbol} for ${convertedNotification.data.price} SOL`;
    } else if (notification.type === "transaction_logged") {
      const convertedNotification: TransactionLoggedNotification =
        notification as TransactionLoggedNotification;
      toastMessage = `${convertedNotification.data.transactionType} ${convertedNotification.data.amount} tokens for ${convertedNotification.data.price} SOL`;
    } else if (notification.type === "tracked_wallet_change") {
      const convertedNotification: TrackedWalletChangeNotification =
        notification as TrackedWalletChangeNotification;
      toastMessage = `Wallet address changed from ${convertedNotification.data.oldWalletAddress} to ${convertedNotification.data.newWalletAddress}`;
    } else if (notification.type === "copy_trade_settings_change") {
      const convertedNotification: CopyTradeSettingsNotification =
        notification as CopyTradeSettingsNotification;
      toastMessage = `Copy trade settings updated for tracked wallet ${convertedNotification.data.tracked_wallet_id}`;
    }

    toast({
      title: notification.type,
      description: toastMessage,
    });

    set((state) => ({
      notifications: [
        notificationWithTimestamp as Notification,
        ...state.notifications.slice(0, 49),
      ],
    }));
  },
  addWallet: (wallet) => {
    set({
      trackedWallet: {
        id: wallet.id,
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
      ),
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

  addTrackedWallet: async (walletAddress: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tracked_wallets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: walletAddress,
          is_active: true,
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

  updateTrackedWallet: async (
    payload: UpdateTrackedWalletPayload
  ): Promise<UpdateTrackedWalletResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tracked_wallets/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload }),
      });
      if (!response.ok) throw new Error("Failed to update tracked wallet");
      return await response.json();
    } catch (error) {
      console.error("Error updating tracked wallet:", error);
      return {
        success: false,
        new_tracked_wallet_id: payload.tracked_wallet_id,
      };
    }
  },

  fetchTrackedWallets: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tracked_wallets`);
      if (!response.ok) throw new Error("Failed to fetch tracked wallets");
      const data: FetchTrackedWalletResponse = await response.json();
      set((state) => ({
        //need to get the wallet from the array of wallets where is_active is true and set it to the trackedWallet. If there is no wallet, set it to null
        trackedWallet: data.tracked_wallets.find((wallet) => wallet.is_active)
          ? data.tracked_wallets.find((wallet) => wallet.is_active)
          : null,
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

  updateCopyTradeSettings: async (
    settings: CopyTradeSettings
  ): Promise<UpdateCopyTradeSettingsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/copy_trade_settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!response.ok) throw new Error("Failed to update copy trade settings");
      set({ copyTradeSettings: settings });
      const data: UpdateCopyTradeSettingsResponse = await response.json();
      return await response.json();
    } catch (error) {
      console.error("Error updating copy trade settings:", error);
      return {
        success: false,
        settings_id: "",
      };
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

  buyToken: async (
    buyRequest: BuyTokenRequest
  ): Promise<BuyTransactionResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/buy_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buyRequest),
      });
      if (!response.ok) throw new Error("Failed to buy token");
      const data: BuyTransactionResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error buying token:", error);
      return {
        success: false,
        signature: "",
        token_data: {
          address: buyRequest.token_address,
          symbol: "",
          name: "",
        },
        transaction_data: {
          type: "BUY",
          amount_sol: 0,
          slippage: buyRequest.slippage,
        },
      };
    }
  },

  //return a promise that resolves to the response data and declare the return type as SellTransactionResponse
  sellToken: async (
    sellRequest: SellTokenRequest
  ): Promise<SellTransactionResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/sell_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sellRequest),
      });
      if (!response.ok) throw new Error("Failed to sell token");
      const data: SellTransactionResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error selling token:", error);
      return {
        success: false,
        signature: "",
        token_data: {
          address: sellRequest.token_address,
          symbol: "",
          name: "",
        },
        transaction_data: {
          type: "SELL",
          amount_tokens: 0,
          slippage: sellRequest.slippage,
        },
      };
    }
  },
  error: null,
  isLoading: false,
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
