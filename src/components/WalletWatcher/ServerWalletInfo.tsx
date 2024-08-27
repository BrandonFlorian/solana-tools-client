// components/WalletTracker/ServerWalletInfo.tsx
"use client";
import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SellTokenRequest,
  useWalletTrackerStore,
} from "@/store/walletWatcherStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import CustomImage from "../CustomLoader/CustomLoader";

export const ServerWalletInfo: React.FC = () => {
  const { serverWallet, isLoading, sellToken, setIsLoading } =
    useWalletTrackerStore();
  const [sellAmounts, setSellAmounts] = useState<{ [key: string]: string }>({});
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

  if (!serverWallet) return null;

  console.log(serverWallet);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold mb-4">
          Balance: {serverWallet.balance} SOL
        </p>
        <h3 className="text-lg font-semibold mb-2">Tokens:</h3>
        <div className="space-y-4">
          {serverWallet.tokens.map((token) => (
            <div
              key={token.address}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2 w-1/3">
                {/* {token.metadataUri && ( need to fetch the metadata and then use the image url from there
                  <CustomImage
                    src={token.imageUri}
                    alt={token.symbol}
                    width={50}
                    height={50}
                  />
                )} */}
                <span className="font-medium">{token.symbol}</span>
                <span className="text-sm text-gray-500">{token.name}</span>
              </div>
              <span className="w-1/6 text-right">{token.balance}</span>
              <div className="flex items-center space-x-2 w-1/2">
                <Input
                  type="number"
                  value={sellAmounts[token.address] || ""}
                  onChange={(e) =>
                    handleSellAmountChange(token.address, e.target.value)
                  }
                  placeholder="Amount to sell"
                  className="w-2/3"
                />
                <Button
                  onClick={() => handleSellToken(token.address)}
                  disabled={isLoading}
                  className="w-1/3"
                >
                  {isLoading ? "Selling..." : "Sell"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
