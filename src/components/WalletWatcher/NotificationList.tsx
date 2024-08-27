// components/WalletTracker/NotificationList.tsx
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletTrackerStore } from "@/store/walletWatcherStore";
import { Avatar, AvatarImage } from "../ui/avatar";

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
                    <CardTitle>
                      {notification.type}: {notification.data.transactionType}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* <Avatar>
                      <AvatarImage
                        src={notification.transaction_data.tokenImageUri}
                      />
                    </Avatar> */}
                    <p>
                      {notification.data.amountToken}
                      {notification.data.tokenSymbol} at{" "}
                      {notification.data.amountSol} SOL
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
