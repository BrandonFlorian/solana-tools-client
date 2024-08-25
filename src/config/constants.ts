export const PUMPSCREENER_WEBSOCKET_URL: string =
  process.env.NEXT_PUBLIC_PUMPSCREENER_WEBSOCKET_URL!;
export const API_URL: string = process.env.NEXT_PUBLIC_METADATA_URL!;
export const WALLET_TRACKER_WEBSOCKET_URL: string =
  process.env.NEXT_PUBLIC_WALLET_TRACKER_WEBSOCKET_URL!;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

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

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};
