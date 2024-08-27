"use client";
import React, { useEffect } from "react";
import useWebSocket from "@/hooks/useWebsocket";
import { API_URL, PUMPSCREENER_WEBSOCKET_URL } from "@/config/constants";
import { useTokenStore } from "@/store/pumpfunStore";

import { TokenFilters } from "@/components/TokenFilters/TokenFilters";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TokenCard } from "@/components/TokenCard/TokenCard";

const TokenGallery: React.FC = () => {
  useWebSocket(PUMPSCREENER_WEBSOCKET_URL, API_URL);
  const filteredTokens = useTokenStore((state) => state.filteredTokens);
  const applyFiltersAndSort = useTokenStore(
    (state) => state.applyFiltersAndSort
  );

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  return (
    <Card className="p-4">
      <CardHeader>
        <h1 className="text-3xl font-bold mb-4">Token Gallery</h1>
      </CardHeader>
      <CardContent>
        <TokenFilters />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
          {filteredTokens.map((token) => (
            <TokenCard key={token.mint} token={token} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenGallery;
