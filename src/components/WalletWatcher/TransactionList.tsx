// components/WalletTracker/TransactionList.tsx
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletTrackerStore } from "@/store/walletWatcherStore";

export const TransactionList: React.FC = () => {
  const { recentTransactions } = useWalletTrackerStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {recentTransactions.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          <ul>
            {recentTransactions.map((tx) => (
              <li key={tx.id}>
                <div className="flex items-center justify-between">
                  <p>{tx.transaction_type}: </p>
                  <p>{tx.token_address}:</p>
                  <p>{tx.amount}</p>
                  <p>at {tx.price_sol} SOL</p>
                  <p>{tx.timestamp}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
