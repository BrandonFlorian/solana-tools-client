"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWalletTrackerStore } from "@/store/walletWatcherStore";
import { Input } from "../ui/input";

export const TrackWallet: React.FC = () => {
  const { addTrackedWallet, isLoading, setIsLoading } = useWalletTrackerStore();

  const [solPerTrade, setSolPerTrade] = useState<number>(0.001);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const handleSetSolPerTrade = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSolPerTrade(parseFloat(e.target.value));
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
        <CardTitle>Track New Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mt-2">
          <Input
            type="text"
            value={walletAddress}
            onChange={handleSetWalletAddress}
            placeholder="Track Wallet Address"
          />
          <Input
            type="number"
            value={solPerTrade}
            onChange={handleSetSolPerTrade}
            placeholder="Amount to Trade"
          />
          <Button onClick={handleTrackWallet}>Track</Button>
        </div>
      </CardContent>
    </Card>
  );
};
