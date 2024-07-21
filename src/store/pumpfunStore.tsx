"use client";
import { create } from "zustand";
import { Token } from "@/types/crypto";

interface Filters {
  [key: string]: boolean | string | number | string[] | undefined;
  hasTelegram?: boolean;
  hasTwitter?: boolean;
  hasWebsite?: boolean;
  hasKingOfTheHill?: boolean;
  noKingOfTheHill?: boolean;
  searchQuery?: string;
  excludedWords?: string[];
  minMarketCap?: number;
  maxMarketCap?: number;
  minReplies?: number;
}

interface TokenStore {
  tokens: Token[];
  setTokens: (tokens: Token[]) => void;
  addOrUpdateToken: (token: Token) => void;
  getTokenByAddress: (address: string) => Token | undefined;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  sortOption: string;
  setSortOption: (sortOption: string) => void;
  filteredTokens: Token[];
  applyFiltersAndSort: () => void;
  clearFilters: () => void;
}

export const useTokenStore = create<TokenStore>((set, get) => ({
  tokens: [],
  setTokens: (tokens) => {
    set({ tokens });
    get().applyFiltersAndSort();
  },
  addOrUpdateToken: (token) => {
    set((state) => {
      const index = state.tokens.findIndex((t) => t.mint === token.mint);
      if (index >= 0) {
        const newTokens = [...state.tokens];
        newTokens[index] = token;
        return { tokens: newTokens };
      } else {
        return { tokens: [...state.tokens, token] };
      }
    });
    get().applyFiltersAndSort();
  },
  getTokenByAddress: (mint: string) => {
    return get().tokens.find((token) => token.mint === mint);
  },
  filters: {},
  setFilters: (filters) => {
    set({ filters });
    get().applyFiltersAndSort();
  },
  clearFilters: () => {
    set({
      filters: {},
      sortOption: "",
    });
    get().applyFiltersAndSort();
  },
  sortOption: "",
  setSortOption: (sortOption) => {
    set({ sortOption });
    get().applyFiltersAndSort();
  },
  filteredTokens: [],
  applyFiltersAndSort: () => {
    const { tokens, filters, sortOption } = get();
    let updatedTokens = tokens;

    if (filters.hasTelegram) {
      updatedTokens = updatedTokens.filter((token) => token.telegram);
    }
    if (filters.hasTwitter) {
      updatedTokens = updatedTokens.filter((token) => token.twitter);
    }
    if (filters.hasWebsite) {
      updatedTokens = updatedTokens.filter((token) => token.website);
    }
    if (filters.hasKingOfTheHill) {
      updatedTokens = updatedTokens.filter(
        (token) => token.kingOfTheHillTimestamp !== null
      );
    }
    if (filters.noKingOfTheHill) {
      updatedTokens = updatedTokens.filter(
        (token) => token.kingOfTheHillTimestamp === null
      );
    }
    if (filters.minReplies !== undefined) {
      updatedTokens = updatedTokens.filter(
        (token) => token.replyCount >= Number(filters.minReplies)
      );
    }
    if (filters.minMarketCap !== undefined) {
      updatedTokens = updatedTokens.filter(
        (token) => token.usdMarketCap >= Number(filters.minMarketCap)
      );
    }
    if (filters.maxMarketCap !== undefined) {
      updatedTokens = updatedTokens.filter(
        (token) => token.usdMarketCap <= Number(filters.maxMarketCap)
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      updatedTokens = updatedTokens.filter(
        (token) =>
          token.mint.toLowerCase().includes(query) ||
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query)
      );
    }

    if (filters.excludedWords && filters.excludedWords.length > 0) {
      updatedTokens = updatedTokens.filter(
        (token) =>
          !filters.excludedWords!.some(
            (word: string) =>
              token.name.toLowerCase().includes(word.toLowerCase()) ||
              token.symbol.toLowerCase().includes(word.toLowerCase()) ||
              (token.description &&
                token.description.toLowerCase().includes(word.toLowerCase()))
          )
      );
    }

    const sortedTokens = [...updatedTokens].sort((a, b) => {
      if (sortOption === "highToLow") {
        return b.usdMarketCap - a.usdMarketCap;
      }
      if (sortOption === "lowToHigh") {
        return a.usdMarketCap - b.usdMarketCap;
      }
      if (sortOption === "newest") {
        return b.createdTimestamp - a.createdTimestamp;
      }
      if (sortOption === "oldest") {
        return a.createdTimestamp - b.createdTimestamp;
      }
      return 0;
    });

    set({ filteredTokens: sortedTokens });
  },
}));
