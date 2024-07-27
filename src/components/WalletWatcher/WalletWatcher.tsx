"use client";
import React, { useState } from "react";
import { useWalletWatcherStore } from "@/store/walletWatcherStore";
import WalletPanel from "./WalletPanel";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WalletWatcher: React.FC = () => {
  const { trackedWallets, addWallet } = useWalletWatcherStore();

  const [newWallet, setNewWallet] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddWallet = () => {
    if (newWallet && bidAmount) {
      addWallet(newWallet, parseFloat(bidAmount));
      setNewWallet("");
      setBidAmount("");
      setSuccessMessage("Wallet added successfully!");
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter both wallet address and bid amount.");
      setSuccessMessage("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Wallet Watcher</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Enter public key to track"
            value={newWallet}
            onChange={(e) => setNewWallet(e.target.value)}
            className="flex-grow"
          />
          <Input
            placeholder="SOL per trade"
            type="text"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            //className="md:w-32"
          />
          <Button onClick={handleAddWallet}>Add Wallet</Button>
        </div>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert className="mb-4">
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {trackedWallets.map((wallet) => (
          <WalletPanel key={wallet.address} wallet={wallet} />
        ))}
      </CardContent>
    </Card>
  );
};

export default WalletWatcher;
