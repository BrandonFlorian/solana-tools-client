import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

interface TransactionResult {
  blockTime: number;
  slot: number;
  // Add other fields as needed
}

interface TransactionData {
  jsonrpc: string;
  result: TransactionResult;
  id: number;
}
export interface CoinData {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  twitter: string | null;
  telegram: string | null;
  bonding_curve: string;
  associated_bonding_curve: string;
  creator: string;
  created_timestamp: number;
  raydium_pool: string | null;
  complete: boolean;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  total_supply: number;
  website: string | null;
  show_name: boolean;
  king_of_the_hill_timestamp: number | null;
  market_cap: number;
  reply_count: number;
  last_reply: number;
  nsfw: boolean;
  market_id: string | null;
  inverted: boolean | null;
  username: string;
  profile_image: string;
  usd_market_cap: number;
}

export interface TokenWebsocketResponse {
  signature: string;
  transaction_data: TransactionData;
  coin_data: CoinData;
}

export interface Token {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  imageUri: string;
  metadataUri: string;
  twitter: string | null;
  telegram: string | null;
  bondingCurve: string;
  associatedBondingCurve: string;
  creator: string;
  createdTimestamp: number;
  raydiumPool: string | null;
  complete: boolean;
  virtualSolReserves: number;
  virtualTokenReserves: number;
  totalSupply: number;
  website: string | null;
  showName: boolean;
  kingOfTheHillTimestamp: number | null;
  marketCap: number;
  replyCount: number;
  lastReply: number;
  nsfw: boolean;
  marketId: string | null;
  inverted: boolean | null;
  username: string;
  profileImage: string;
  usdMarketCap: number;
}

export type Action = { type: "RECEIVE_TOKEN"; payload: Token };

export interface Transaction {
  signature: string;
  slot: number;
  err: any;
  memo: string;
  blockTime: number;
  confirmationStatus: string;
}

export interface WalletState {
  wallet: string;
  transactions: Transaction[];
}

export interface WalletStore {
  wallets: WalletState[];
  addWallet: (wallet: string) => void;
  removeWallet: (wallet: string) => void;
  addTransaction: (wallet: string, transaction: Transaction) => void;
  network: WalletAdapterNetwork;
  endpoint: string;
  setNetwork: (network: WalletAdapterNetwork) => void;
  setEndpoint: (endpoint: string) => void;
}
