export const WEBSOCKET_URL: string = process.env.NEXT_PUBLIC_WEBSOCKET_URL!;
export const API_URL: string = process.env.NEXT_PUBLIC_METADATA_URL!;
export const WALLET_WEBSOCKET_URL: string =
  process.env.NEXT_PUBLIC_WALLET_WEBSOCKET_URL!;

export const config = {
  sounds: {
    confirm: {
      src: "sounds/menu-confirm.mp3",
      volume: 0.5,
    },
    cancel: {
      src: "sounds/menu-cancel.mp3",
      volume: 0.5,
    },
  },
};
