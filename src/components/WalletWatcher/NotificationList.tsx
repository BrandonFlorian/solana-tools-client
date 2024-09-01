// components/WalletTracker/NotificationList.tsx
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useWalletTrackerStore,
  Notification,
} from "@/store/walletWatcherStore";
import { Avatar, AvatarImage } from "../ui/avatar";

const NotificationContent: React.FC<{ notification: Notification }> = ({
  notification,
}) => {
  if (
    notification.type === "copy_trade_execution" ||
    notification.type === "tracked_wallet_trade"
  ) {
    return (
      <>
        <Avatar>
          <AvatarImage src={notification.data.tokenImageUri} />
        </Avatar>
        <p>
          {notification.data.transactionType} {notification.data.amountToken}{" "}
          {notification.data.tokenSymbol}
          at {notification.data.amountSol} SOL
        </p>
      </>
    );
  } else if (notification.type === "server_wallet_trade") {
    return (
      <p>
        {notification.data.transactionType} {notification.data.amount}{" "}
        {notification.data.tokenSymbol}
        at {notification.data.price} SOL
      </p>
    );
  } else if (notification.type === "transaction_logged") {
    return (
      <p>
        {notification.data.transactionType} {notification.data.amount} tokens at{" "}
        {notification.data.price} SOL
      </p>
    );
  } else {
    return <p>Unknown notification type</p>;
  }
};

export const NotificationList: React.FC = () => {
  const { notifications } = useWalletTrackerStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                <Card>
                  <CardHeader>
                    <CardTitle>{notification.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <NotificationContent notification={notification} />
                    <p className="text-sm text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
