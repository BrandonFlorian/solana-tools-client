import React, { useEffect, useState } from "react";
import { Token } from "@/types/crypto";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PixelBorder } from "@/components/ui/pixel-border";
import Image from "next/image";
import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";

interface TokenCardProps {
  token: Token;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  const [prevToken, setPrevToken] = useState<Token>(token);
  const { theme } = useThemeStore();
  const isPixelTheme = theme.startsWith("nes") || theme.startsWith("snes");

  const truncate = (str: string, length: number) => {
    if (!str) return str;
    return str.length > length ? `${str.substring(0, length)}...` : str;
  };

  useEffect(() => {
    if (JSON.stringify(token) !== JSON.stringify(prevToken)) {
      // You can implement a custom animation here if needed
      setPrevToken(token);
    }
  }, [token, prevToken]);

  return (
    <Card className="w-full h-full overflow-hidden cursor-pointer">
      <CardHeader className="p-2">
        <div className="relative w-full pt-[100%]">
          {token.imageUri && (
            <Image
              src={token.imageUri}
              alt={token.name}
              className="object-contain"
              fill
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <h3 className="font-bold text-sm">{truncate(token.symbol, 10)}</h3>
        <p className="font-bold text-xs">{truncate(token.name, 15)}</p>
        <p className="text-xs mt-1">{truncate(token.description, 50)}</p>
        <p className="text-xs mt-1">MC: {token.usdMarketCap?.toFixed(2)} SOL</p>
        <p className="text-xs">Replies: {token.replyCount}</p>
      </CardContent>
      <CardFooter className="p-2">
        <div className="flex justify-between w-full">
          <p className="text-xs">Links</p>
          {token.kingOfTheHillTimestamp && <PixelBorder>👑</PixelBorder>}
          {token.twitter && (
            <Link
              href={token.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="icon" variant={isPixelTheme ? "outline" : "ghost"}>
                X
              </Button>
            </Link>
          )}
          {token.telegram && (
            <Link
              href={token.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="icon" variant={isPixelTheme ? "outline" : "ghost"}>
                T
              </Button>
            </Link>
          )}
          {token.website && (
            <Link
              href={token.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="icon" variant={isPixelTheme ? "outline" : "ghost"}>
                W
              </Button>
            </Link>
          )}
          <Link
            href={`https://pump.fun/${token.mint}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="icon" variant={isPixelTheme ? "outline" : "ghost"}>
              P
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TokenCard;
