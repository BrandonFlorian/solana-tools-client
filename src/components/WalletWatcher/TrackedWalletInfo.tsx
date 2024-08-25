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
    isLoading,
    setIsLoading,
    sellToken,
  } = useWalletTrackerStore();

  const [isEnabled, setIsEnabled] = useState(
    copyTradeSettings?.is_enabled || false
  );
  const [solAmount, setSolAmount] = useState(
    copyTradeSettings?.trade_amount_sol?.toString() || ""
  );

  const [sellAmounts, setSellAmounts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setIsEnabled(copyTradeSettings?.is_enabled || false);
    setSolAmount(copyTradeSettings?.trade_amount_sol?.toString() || "");
  }, [copyTradeSettings]);

  if (!trackedWallet) return null;

  const handleSolAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSolAmount(e.target.value);
  };

  const handleSellAmountChange = (tokenAddress: string, amount: string) => {
    setSellAmounts({ ...sellAmounts, [tokenAddress]: amount });
  };

  const handleSellToken = async (tokenAddress: string) => {
    setIsLoading(true);
    try {
      const sellRequest: SellTokenRequest = {
        dex_type: "pump_fun", // Assuming pump_fun as the default DEX
        token_address: tokenAddress,
        slippage: 0.01, // Default slippage, you might want to make this configurable
      };
      if (sellAmounts[tokenAddress]) {
        sellRequest.amount_tokens = parseFloat(sellAmounts[tokenAddress]);
      }
      await sellToken(sellRequest);
    } catch (error) {
      console.error("Failed to sell token", error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracked Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Address: {trackedWallet.wallet_address}</p>
        <div className="flex items-center space-x-2 mt-2">
          <Input
            type="number"
            value={solAmount}
            onChange={handleSolAmountChange}
            placeholder="SOL amount"
          />
          <Button onClick={handleUpdateSettings}>Update</Button>
        </div>
        <div className="flex items-center mt-4">
          <Switch checked={isEnabled} onCheckedChange={handleToggle} />
          <span className="ml-2">
            Copy Trading: {isEnabled ? "Enabled" : "Disabled"}
          </span>
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
