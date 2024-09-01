"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWalletTrackerStore } from "@/store/walletWatcherStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { toast } from "../ui/use-toast";

export const ServerWalletSummary = () => {
  const {
    serverWallet,
    sellToken,
    recentTransactions,
    fetchTransactionHistory,
    copyTradeSettings,
    addNotification,
  } = useWalletTrackerStore();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [sellAmounts, setSellAmounts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchTransactionHistory();
  }, [fetchTransactionHistory]);
  console.log(serverWallet);
  if (!serverWallet) return null;

  const handleSellAmountChange = (tokenAddress: string, amount: string) => {
    setSellAmounts({ ...sellAmounts, [tokenAddress]: amount });
  };

  const handleSellToken = async (tokenAddress: string) => {
    const amount = sellAmounts[tokenAddress]
      ? parseFloat(sellAmounts[tokenAddress])
      : undefined;

    // if (!amount) {
    //   toast({
    //     title: "Error",
    //     description: "Please enter an amount to sell",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    const result = await sellToken({
      dex_type: "pump_fun",
      token_address: tokenAddress,
      amount_tokens: amount,
      slippage: copyTradeSettings?.max_slippage || 0.2,
    });

    if (result.success) {
      addNotification({
        type: "server_wallet_trade",
        data: {
          signature: result.signature,
          tokenAddress: result.token_data.address,
          tokenName: result.token_data.name,
          tokenSymbol: result.token_data.symbol,
          transactionType: "SELL",
          amount: result.transaction_data.amount_tokens,
          price:
            result.transaction_data.amount_tokens *
            serverWallet.tokens.find((t) => t.address === tokenAddress)!
              .balance,
        },
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Wallet Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold mb-2">
          Balance: {serverWallet.balance} SOL
        </p>
        <p className="mb-4">Total Tokens: {serverWallet.tokens.length}</p>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button>View Details</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Server Wallet Details</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              {serverWallet.tokens.map((token) => (
                <div
                  key={token.address}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex-grow">
                    <p className="font-semibold">{token.symbol}</p>
                    <p className="text-sm">{token.name}</p>
                    <p>Balance: {token.balance}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={sellAmounts[token.address] || ""}
                      onChange={(e) =>
                        handleSellAmountChange(token.address, e.target.value)
                      }
                      placeholder="Amount to sell"
                      className="w-32"
                    />
                    <Button
                      onClick={() => handleSellToken(token.address)}
                      className="whitespace-nowrap"
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
          <ScrollArea className="h-full">
            {recentTransactions.slice(0, 5).map((transaction, index) => (
              <div key={index} className="mb-2">
                <p>
                  {transaction.transaction_type.toUpperCase()} -{" "}
                  {transaction.amount} {transaction.token_address} for{" "}
                  {transaction.price_sol} SOL
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
