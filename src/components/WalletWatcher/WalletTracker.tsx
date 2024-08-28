"use client";
import React, { useEffect } from "react";
import { ServerWalletInfo } from "./ServerWalletInfo";
import { TransactionList } from "./TransactionList";
import { NotificationList } from "./NotificationList";
import { useWalletTrackerStore } from "@/store/walletWatcherStore";
import { TrackedWalletInfo } from "./TrackedWalletInfo";
import useWalletTrackerWebSocket from "@/hooks/useWalletTrackerWebsocket";
import { WALLET_TRACKER_WEBSOCKET_URL } from "@/config/constants";
import { TrackWallet } from "./TrackWallet";

export const WalletTracker: React.FC = () => {
  const {
    fetchServerWallet,
    fetchTrackedWallets,
    fetchCopyTradeSettings,
    fetchTransactionHistory,
    error,
    isLoading,
    setIsLoading,
    setError,
  } = useWalletTrackerStore();

  const { isConnected } = useWalletTrackerWebSocket(
    WALLET_TRACKER_WEBSOCKET_URL
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchServerWallet(),
          fetchTrackedWallets(),
          fetchCopyTradeSettings(),
          fetchTransactionHistory(),
        ]);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    fetchServerWallet,
    fetchTrackedWallets,
    fetchCopyTradeSettings,
    fetchTransactionHistory,
    setIsLoading,
    setError,
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Wallet Tracker</h1>
      <TrackWallet />
      <ServerWalletInfo />
      <TrackedWalletInfo />
      {/* <div className="mt-8">
        <TransactionList />
      </div> */}
      <div className="mt-8">
        <NotificationList />
      </div>
    </div>
  );
};
