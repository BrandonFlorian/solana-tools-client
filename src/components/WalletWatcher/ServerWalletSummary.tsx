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
  const [loadingTokens, setLoadingTokens] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchTransactionHistory();
  }, [fetchTransactionHistory]);

  if (!serverWallet) return null;

  const handleSellAmountChange = (tokenAddress: string, amount: string) => {
    setSellAmounts({ ...sellAmounts, [tokenAddress]: amount });
  };

  const handleSellToken = async (tokenAddress: string) => {
    try {
      setLoadingTokens((prev) => ({ ...prev, [tokenAddress]: true }));
      const amount = sellAmounts[tokenAddress]
        ? parseFloat(sellAmounts[tokenAddress])
        : undefined;

      const result = await sellToken({
        dex_type: "pump_fun",
        token_address: tokenAddress,
        amount_tokens: amount,
        slippage: copyTradeSettings?.max_slippage || 0.2,
      });

      if (result.success) {
        const token = serverWallet.tokens.find(
          (t) => t.address === tokenAddress
        );
        const amountSold = amount || token?.balance || 0;
        const priceSol =
          result.transaction_data.amount_tokens *
          serverWallet.tokens.find((t) => t.address === tokenAddress)!.balance;

        addNotification({
          type: "server_wallet_trade",
          data: {
            signature: result.signature,
            tokenAddress: result.token_data.address,
            tokenName: result.token_data.name,
            tokenSymbol: result.token_data.symbol,
            transactionType: "SELL",
            amount: amountSold,
            price: priceSol,
          },
        });
      }
    } catch (error) {
      console.error("Failed to sell token", error);
    } finally {
      setLoadingTokens((prev) => ({ ...prev, [tokenAddress]: false }));
    }
  };

  const setPercentage = (tokenAddress: string, percentage: number) => {
    const token = serverWallet.tokens.find((t) => t.address === tokenAddress);
    if (token) {
      const amount = (token.balance * percentage)
        .toFixed(9)
        .replace(/\.?0+$/, "");
      setSellAmounts((prev) => ({ ...prev, [tokenAddress]: amount }));
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
                <div key={token.address} className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{token.symbol}</p>
                      <p className="text-sm">{token.name}</p>
                      <p>Balance: {token.balance}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-col">
                        <Input
                          type="number"
                          value={sellAmounts[token.address] || ""}
                          onChange={(e) =>
                            handleSellAmountChange(
                              token.address,
                              e.target.value
                            )
                          }
                          placeholder="Amount to sell"
                          className="w-32 mb-2"
                        />
                        <div className="flex space-x-1">
                          {[25, 50, 75, 100].map((percentage) => (
                            <Button
                              key={percentage}
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setPercentage(token.address, percentage / 100)
                              }
                              className="px-1 py-0 text-xs"
                            >
                              {percentage}%
                            </Button>
                          ))}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleSellToken(token.address)}
                        className="whitespace-nowrap h-full"
                        disabled={loadingTokens[token.address]}
                      >
                        {loadingTokens[token.address] ? "Selling..." : "Sell"}
                      </Button>
                    </div>
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
