// components/ActivityFeed.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { ClientTxInfo } from "@/store/walletWatcherStore";

interface ActivityFeedProps {
  notifications: Array<{
    type: "copy_trade_execution";
    trade_type: string;
    transaction_data: ClientTxInfo;
  }>;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ notifications }) => {
  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {notifications.map((notification, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center">
                <Badge
                  variant={
                    notification.trade_type === "buy" ? "default" : "secondary"
                  }
                >
                  {notification.trade_type.toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {new Date(
                    notification.transaction_data.timestamp * 1000
                  ).toLocaleString()}
                </span>
              </div>
              <p className="mt-1">
                {notification.transaction_data.amount_token}{" "}
                {notification.transaction_data.token_symbol}
                for {notification.transaction_data.amount_sol} SOL
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Price: {notification.transaction_data.price_per_token} SOL per
                token
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
