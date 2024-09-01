import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWalletTrackerStore } from "@/store/walletWatcherStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TrackedWalletCard = () => {
  const { trackedWallet, removeTrackedWallet, addTrackedWallet } =
    useWalletTrackerStore();
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTrackWallet = async () => {
    if (newWalletAddress) {
      await addTrackedWallet(newWalletAddress);
      setNewWalletAddress("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracked Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        {trackedWallet ? (
          <>
            <p className="mb-2">Address: {trackedWallet.wallet_address}</p>
            <div className="flex space-x-2">
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(trackedWallet.wallet_address)
                }
              >
                Copy Address
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Wallet</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Tracked Wallet</DialogTitle>
                  </DialogHeader>
                  <Input
                    value={newWalletAddress}
                    onChange={(e) => setNewWalletAddress(e.target.value)}
                    placeholder="New Wallet Address"
                  />
                  <Button onClick={handleTrackWallet}>Track New Wallet</Button>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      removeTrackedWallet(trackedWallet.wallet_address)
                    }
                  >
                    Remove Tracked Wallet
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </>
        ) : (
          <div>
            <Input
              value={newWalletAddress}
              onChange={(e) => setNewWalletAddress(e.target.value)}
              placeholder="Wallet Address to Track"
            />
            <Button onClick={handleTrackWallet} className="mt-2">
              Track Wallet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
