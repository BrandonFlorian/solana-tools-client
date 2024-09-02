"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  CopyTradeSettingsNotification,
  UpdateCopyTradeSettingsResponse,
  useWalletTrackerStore,
} from "@/store/walletWatcherStore";
import { toast } from "@/components/ui/use-toast";

export const CopyTradeSettingsPanel: React.FC = () => {
  const {
    copyTradeSettings,
    setCopyTradeSettings,
    updateCopyTradeSettings,
    addNotification,
  } = useWalletTrackerStore();

  const [isLoading, setIsLoading] = React.useState(false);

  if (!copyTradeSettings) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setCopyTradeSettings({
      ...copyTradeSettings,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setCopyTradeSettings({
      ...copyTradeSettings,
      [name]: checked,
    });
  };

  const handleAllowedTokensChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const tokens = e.target.value.split(",").map((token) => token.trim());
    setCopyTradeSettings({
      ...copyTradeSettings,
      allowed_tokens: tokens,
    });
  };

  const handleUpdateSettings = async () => {
    setIsLoading(true);
    try {
      const response: UpdateCopyTradeSettingsResponse =
        await updateCopyTradeSettings(copyTradeSettings);
      if (!response) {
        throw new Error("Failed to update copy trade settings");
      }
      const notification: Omit<CopyTradeSettingsNotification, "timestamp"> = {
        type: "copy_trade_settings_change",
        data: copyTradeSettings,
      };
      addNotification(notification);
    } catch (error) {
      console.error("Failed to update copy trade settings:", error);
      toast({
        title: "Error",
        description: "Failed to update copy trade settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Copy Trade Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="is_enabled">Enable Copy Trading</Label>
            <Switch
              id="is_enabled"
              checked={copyTradeSettings.is_enabled}
              onCheckedChange={handleSwitchChange("is_enabled")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trade_amount_sol">Trade Amount (SOL)</Label>
            <Input
              id="trade_amount_sol"
              name="trade_amount_sol"
              type="number"
              value={copyTradeSettings.trade_amount_sol}
              onChange={handleInputChange}
              step="0.001"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_slippage">Max Slippage (%)</Label>
            <Input
              id="max_slippage"
              name="max_slippage"
              type="number"
              value={copyTradeSettings.max_slippage}
              onChange={handleInputChange}
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_open_positions">Max Open Positions</Label>
            <Input
              id="max_open_positions"
              name="max_open_positions"
              type="number"
              value={copyTradeSettings.max_open_positions}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="min_sol_balance">Minimum SOL Balance</Label>
            <Input
              id="min_sol_balance"
              name="min_sol_balance"
              type="number"
              value={copyTradeSettings.min_sol_balance}
              onChange={handleInputChange}
              step="0.01"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="use_allowed_tokens">Use Allowed Tokens List</Label>
            <Switch
              id="use_allowed_tokens"
              checked={copyTradeSettings.use_allowed_tokens}
              onCheckedChange={handleSwitchChange("use_allowed_tokens")}
            />
          </div>

          {copyTradeSettings.use_allowed_tokens && (
            <div className="space-y-2">
              <Label htmlFor="allowed_tokens">
                Allowed Tokens (comma-separated)
              </Label>
              <Input
                id="allowed_tokens"
                name="allowed_tokens"
                value={copyTradeSettings.allowed_tokens?.join(", ")}
                onChange={handleAllowedTokensChange}
                placeholder="Token1, Token2, Token3"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="match_sell_percentage">Match Sell Percentage</Label>
            <Switch
              id="match_sell_percentage"
              checked={copyTradeSettings.match_sell_percentage}
              onCheckedChange={handleSwitchChange("match_sell_percentage")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="allow_additional_buys">Allow Additional Buys</Label>
            <Switch
              id="allow_additional_buys"
              checked={copyTradeSettings.allow_additional_buys}
              onCheckedChange={handleSwitchChange("allow_additional_buys")}
            />
          </div>

          <Button
            onClick={handleUpdateSettings}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Updating..." : "Update Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
