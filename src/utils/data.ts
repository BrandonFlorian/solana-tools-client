import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

export interface Token {
  address: string;
  name: string;
  description: string;
  imageUrl: string;
  marketCap: number;
  replies: number;
}

export async function getKeyPairFromPrivateKey(key: string) {
  return Keypair.fromSecretKey(new Uint8Array(bs58.decode(key)));
}

export function truncateSolanaAddress(address: string) {
  return address.slice(0, 5) + "..." + address.slice(-5);
}

export function getSolanaExplorerUrl(address: string) {
  return `https://explorer.solana.com/address/${address}`;
}

export function getSolanaExplorerTxUrl(txId: string) {
  return `https://explorer.solana.com/tx/${txId}`;
}

//copy to clipboard
export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
