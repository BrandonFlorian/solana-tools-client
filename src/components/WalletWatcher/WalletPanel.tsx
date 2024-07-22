"use client";
import React from "react";
import { useWalletWatcherStore } from "@/store/walletWatcherStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Position {
  tokenAddress: string;
  invested: number;
  currentValue: number;
}

export interface WalletPanelProps {
  wallet: {
    address: string;
    bidAmount: number;
    isCopyTradingEnabled: boolean;
    balance: number;
    positions: Position[];
  };
}

const WalletPanel: React.FC<WalletPanelProps> = ({ wallet }) => {
  const { sellAllPositions, sellPosition, abortTracking } =
    useWalletWatcherStore();

  const totalInvested = wallet.positions.reduce(
    (sum, pos) => sum + pos.invested,
    0
  );
  const totalCurrentValue = wallet.positions.reduce(
    (sum, pos) => sum + pos.currentValue,
    0
  );
  const totalPnL = totalCurrentValue - totalInvested;
  const pnlPercentage = (totalPnL / totalInvested) * 100;

  return (
    <Card className="mb-4">
      <CardHeader>
        <h3 className="text-lg font-semibold">
          Wallet: {wallet.address.slice(0, 8)}...
        </h3>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-2">
          <p>Balance: {wallet.balance.toFixed(2)} SOL</p>
          <p className={totalPnL >= 0 ? "text-green-500" : "text-red-500"}>
            Total PnL: {totalPnL.toFixed(2)} SOL ({pnlPercentage.toFixed(2)}%)
          </p>
        </div>
        <div className="mb-4">
          <Button
            onClick={() => sellAllPositions(wallet.address)}
            className="mr-2"
          >
            SELL ALL
          </Button>
          <Button
            onClick={() => abortTracking(wallet.address)}
            variant="destructive"
          >
            ABORT
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Invested</TableHead>
              <TableHead>Current Value</TableHead>
              <TableHead>PnL</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wallet.positions.map((position) => {
              const pnl = position.currentValue - position.invested;
              const pnlPercentage = (pnl / position.invested) * 100;
              return (
                <TableRow key={position.tokenAddress}>
                  <TableCell>{position.tokenAddress.slice(0, 8)}...</TableCell>
                  <TableCell>{position.invested.toFixed(2)} SOL</TableCell>
                  <TableCell>{position.currentValue.toFixed(2)} SOL</TableCell>
                  <TableCell
                    className={pnl >= 0 ? "text-green-500" : "text-red-500"}
                  >
                    {pnl.toFixed(2)} SOL ({pnlPercentage.toFixed(2)}%)
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        sellPosition(wallet.address, position.tokenAddress)
                      }
                      size="sm"
                    >
                      SELL
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WalletPanel;
