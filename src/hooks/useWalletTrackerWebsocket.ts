// hooks/useWalletTrackerWebSocket.ts
import { useWalletTrackerStore } from "@/store/walletWatcherStore";
import { useState, useEffect, useCallback, useRef } from "react";

const useWalletTrackerWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const { addNotification } = useWalletTrackerStore();

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
      setIsConnected(true);
      const initMessage = JSON.stringify({
        bot_command: "start",
      });
      sendMessage(initMessage);
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      console.log("WebSocket message received:", event);
      if (event.data === undefined) return;
      try {
        const data = JSON.parse(event.data);
        if (data.type === "copy_trade_execution") {
          addNotification(data);
        }
        if (data.type === "tracked_wallet_transaction") {
          addNotification(data);
        }
        // Add more conditions here for other types of messages
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onclose = (event) => {
      console.log(`WebSocket connection closed: ${event}`);
      setIsConnected(false);
      // Attempt to reconnect after a delay
      reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };
  }, [url, sendMessage, addNotification]);

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

  return { sendMessage, isConnected };
};

export default useWalletTrackerWebSocket;
