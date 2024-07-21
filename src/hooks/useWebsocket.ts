"use client";
import { useCallback, useEffect, useRef } from "react";

import { useTokenStore } from "@/store/pumpfunStore";
import { CoinData, Token, TokenWebsocketResponse } from "@/types/crypto";

const useWebSocket = (url: string, apiUrl: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addOrUpdateToken = useTokenStore((state) => state.addOrUpdateToken);
  const getTokenByAddress = useTokenStore((state) => state.getTokenByAddress);

  const transformMintData = useCallback((data: CoinData): Partial<Token> => {
    const token: Partial<Token> = {
      mint: data.mint,
      name: data.name,
      symbol: data.symbol,
      description: data.description,
      imageUri: data.image_uri,
      metadataUri: data.metadata_uri,
      twitter: data.twitter,
      telegram: data.telegram,
      creator: data.creator,
      createdTimestamp: data.created_timestamp,
      raydiumPool: data.raydium_pool,
      complete: data.complete,
      virtualSolReserves: data.virtual_sol_reserves,
      virtualTokenReserves: data.virtual_token_reserves,
      totalSupply: data.total_supply,
      website: data.website,
      showName: data.show_name,
      kingOfTheHillTimestamp: data.king_of_the_hill_timestamp,
      marketCap: data.market_cap,
      replyCount: data.reply_count,
      lastReply: data.last_reply,
      nsfw: data.nsfw,
      marketId: data.market_id,
      inverted: data.inverted,
      username: data.username,
      profileImage: data.profile_image,
      usdMarketCap: data.usd_market_cap,
    };
    return token;
  }, []);

  const handleEvent = useCallback(
    async (data: CoinData): Promise<void> => {
      console.log("data:", data);

      if (!data || typeof data !== "object") {
        console.error("Invalid data received:", data);
        return;
      }

      const partialToken: Partial<Token> = transformMintData(data);

      const existingToken = getTokenByAddress(data.mint);
      if (existingToken) {
        const updatedToken: Token = {
          ...existingToken,
          marketCap: partialToken.marketCap ?? existingToken.marketCap,
          usdMarketCap: partialToken.usdMarketCap ?? existingToken.usdMarketCap,
          virtualSolReserves:
            partialToken.virtualSolReserves ?? existingToken.virtualSolReserves,
          virtualTokenReserves:
            partialToken.virtualTokenReserves ??
            existingToken.virtualTokenReserves,
          totalSupply: partialToken.totalSupply ?? existingToken.totalSupply,
          replyCount: partialToken.replyCount ?? existingToken.replyCount,
          lastReply: partialToken.lastReply ?? existingToken.lastReply,
        };
        addOrUpdateToken(updatedToken);
      } else {
        addOrUpdateToken(partialToken as Token);
      }
    },
    [addOrUpdateToken, getTokenByAddress, transformMintData]
  );

  const sendMessage = useCallback((message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket is not open. Message not sent:", message);
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
      const initMessage = JSON.stringify({
        bot_command: "start",
        trading_algorithm: "buy_all",
      });
      sendMessage(initMessage);
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      console.log("WebSocket message received:", event);
      if (event.data === undefined) return;
      try {
        const data: TokenWebsocketResponse = JSON.parse(event.data);
        if (data.coin_data) {
          handleEvent(data.coin_data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onclose = (event) => {
      console.log(`WebSocket connection closed: ${event}`);
      // Attempt to reconnect after a delay
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [url, handleEvent, sendMessage]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket]);

  return { sendMessage };
};

export default useWebSocket;
