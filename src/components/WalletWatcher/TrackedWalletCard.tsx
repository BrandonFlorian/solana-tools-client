import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrackedWalletChangeNotification,
  UpdateTrackedWalletResponse,
  useWalletTrackerStore,
} from "@/store/walletWatcherStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TrackedWalletCard = () => {
  const {
    trackedWallet,
    removeTrackedWallet,
    addTrackedWallet,
    setTrackedWallet,
    updateTrackedWallet,
    addNotification,
    removeWallet,
  } = useWalletTrackerStore();
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackWallet = async () => {
    try {
      setIsLoading(true);
      if (newWalletAddress) {
        if (trackedWallet) {
          const payload = {
            tracked_wallet_id: trackedWallet.id,
            old_wallet_address: trackedWallet.wallet_address,
            new_wallet_address: newWalletAddress,
          };
          const response: UpdateTrackedWalletResponse =
            await updateTrackedWallet(payload);
          console.log("update response", response);
          if (response.success) {
            setTrackedWallet({
              id: response.new_tracked_wallet_id,
              wallet_address: newWalletAddress,
            });
          }
        } else {
          await addTrackedWallet(newWalletAddress);
        }
        const notification: Omit<TrackedWalletChangeNotification, "timestamp"> =
          {
            type: "tracked_wallet_change",
            data: {
              oldWalletAddress: trackedWallet?.wallet_address || "",
              newWalletAddress: newWalletAddress,
            },
          };
        setNewWalletAddress("");
        setIsDialogOpen(false);
        addNotification(notification);
      }
    } catch (error) {
      console.error("Failed to sell token", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTrackedWallet = async () => {
    try {
      setIsLoading(true);
      if (trackedWallet) {
        await removeTrackedWallet(trackedWallet.wallet_address);
        removeWallet();
      }
    } catch (error) {
      console.error("Failed to remove tracked wallet", error);
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
                  <Button onClick={handleTrackWallet}>
                    {isLoading ? "Loading..." : "Track New Wallet"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleRemoveTrackedWallet}
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
              {isLoading ? "Loading..." : "Track Wallet"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
