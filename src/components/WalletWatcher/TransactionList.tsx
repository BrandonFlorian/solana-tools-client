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
                {tx.transaction_type} {tx.token_address}: {tx.amount} at{" "}
                {tx.price_sol} SOL
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
