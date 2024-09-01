"use client";
import React from "react";

import { CopyTradeSettingsPanel } from "./CopyTradeSettings";

import { NotificationList } from "./NotificationList";
import { useWalletTrackerStore } from "@/store/walletWatcherStore";
import useWalletTrackerWebSocket from "@/hooks/useWalletTrackerWebsocket";
import { WALLET_TRACKER_WEBSOCKET_URL } from "@/config/constants";
import { TrackedWalletCard } from "./TrackedWalletCard";
import { ServerWalletSummary } from "./ServerWalletSummary";

export const WalletTracker = () => {
  const {
    fetchServerWallet,
    fetchTrackedWallets,
    fetchCopyTradeSettings,
    fetchTransactionHistory,
    error,
    isLoading,
  } = useWalletTrackerStore();

  const { isConnected } = useWalletTrackerWebSocket(
    WALLET_TRACKER_WEBSOCKET_URL
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchServerWallet(),
          fetchTrackedWallets(),
          fetchCopyTradeSettings(),
          fetchTransactionHistory(),
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [
    fetchServerWallet,
    fetchTrackedWallets,
    fetchCopyTradeSettings,
    fetchTransactionHistory,
  ]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Wallet Tracker</h1>

      <TrackedWalletCard />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CopyTradeSettingsPanel />
        <ServerWalletSummary />
      </div>

      <NotificationList />
    </div>
  );
};
