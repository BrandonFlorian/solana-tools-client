"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  CopyTradeSettings,
  SellTokenRequest,
  useWalletTrackerStore,
} from "@/store/walletWatcherStore";
import { Input } from "../ui/input";

export const TrackedWalletInfo: React.FC = () => {
  const {
    trackedWallet,
    copyTradeSettings,
    updateCopyTradeSettings,
    removeTrackedWallet,
    setIsLoading,
    sellToken,
    addTrackedWallet,
    isLoading,
  } = useWalletTrackerStore();

  const [isEnabled, setIsEnabled] = useState(
    copyTradeSettings?.is_enabled || false
  );
  const [solAmount, setSolAmount] = useState(
    copyTradeSettings?.trade_amount_sol?.toString() || ""
  );
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [sellAmounts, setSellAmounts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setIsEnabled(copyTradeSettings?.is_enabled || false);
    setSolAmount(copyTradeSettings?.trade_amount_sol?.toString() || "");
  }, [copyTradeSettings]);

  if (!trackedWallet) return null;

  const handleSolAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSolAmount(e.target.value);
  };

  const handleToggle = async () => {
    setIsEnabled(!isEnabled); // Immediately update local state for responsive UI
    try {
      if (
        !copyTradeSettings ||
        !copyTradeSettings.user_id ||
        !copyTradeSettings.tracked_wallet_id ||
        !copyTradeSettings.trade_amount_sol ||
        !copyTradeSettings.max_slippage
      ) {
        console.error("Invalid copy trade settings");
        return;
      } else {
        const settings: CopyTradeSettings = {
          trade_amount_sol: copyTradeSettings?.trade_amount_sol,
          is_enabled: !isEnabled,
          max_slippage: copyTradeSettings?.max_slippage,
          user_id: copyTradeSettings?.user_id,
          tracked_wallet_id: copyTradeSettings?.tracked_wallet_id,
          match_sell_percentage: copyTradeSettings?.match_sell_percentage,
          max_open_positions: copyTradeSettings?.max_open_positions,
          min_sol_balance: copyTradeSettings?.min_sol_balance,
          use_allowed_tokens: copyTradeSettings?.use_allowed_tokens,
          allowed_tokens: copyTradeSettings?.allowed_tokens,
          allow_additional_buys: copyTradeSettings?.allow_additional_buys,
        };

        await updateCopyTradeSettings(settings);
      }
    } catch (error) {
      console.error("Failed to toggle copy trading", error);
      setIsEnabled(isEnabled); // Revert local state if the API call fails
    }
  };

  const handleUpdateSettings = async () => {
    try {
      if (
        !copyTradeSettings ||
        !copyTradeSettings.user_id ||
        !copyTradeSettings.tracked_wallet_id ||
        !copyTradeSettings.max_slippage
      ) {
        console.error("Invalid copy trade settings");
        return;
      } else {
        const settings: CopyTradeSettings = {
          trade_amount_sol: parseFloat(solAmount),
          is_enabled: copyTradeSettings?.is_enabled,
          max_slippage: copyTradeSettings?.max_slippage,
          user_id: copyTradeSettings?.user_id,
          tracked_wallet_id: copyTradeSettings?.tracked_wallet_id,
        };

        await updateCopyTradeSettings(settings);
      }
    } catch (error) {
      console.error("Failed to update copy trade settings", error);
    }
  };

  const handleSetWalletAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
  };

  const handleTrackWallet = async () => {
    setIsLoading(true);
    try {
      if (walletAddress === "") {
        throw new Error("Wallet address is required");
      }
      await addTrackedWallet(walletAddress);
    } catch (error) {
      console.error("Failed to sell token", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracked Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Address: {trackedWallet.wallet_address}</p>
        <div className="flex items-center mt-4">
          <Input
            type="text"
            value={walletAddress}
            onChange={handleSetWalletAddress}
            placeholder="Track Wallet Address"
          />
        </div>
        <Button
          onClick={() => removeTrackedWallet(trackedWallet.wallet_address)}
          className="mt-4"
          variant="destructive"
        >
          Remove Tracked Wallet
        </Button>
      </CardContent>
    </Card>
  );
};
