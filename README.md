# Next.js Solana Token-Gated App

## Overview

This Next.js application integrates with Solana wallets to provide token-gated access to exclusive content. It features a modern, responsive design with customizable themes, including pixel art inspired "NES" and "SNES" modes.

## Features

- Solana wallet integration
- Token-gated access control (WIP)
- Theme customization (Light, Dark, NES, SNES modes)
- Responsive design using Tailwind CSS
- Server-side rendering and static generation capabilities

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A Solana wallet (e.g., Phantom)

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```
   NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   NEXT_PUBLIC_TOKEN_ADDRESS=YOUR_TOKEN_ADDRESS
   ```

   Replace `YOUR_TOKEN_ADDRESS` with the address of your SPL token.

4. Run the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage

1. Connect your Solana wallet using the "Connect Wallet" button.
2. If your wallet contains the required token, you'll be granted access to exclusive content.
3. Use the theme selector in the options menu to switch between different visual themes.

## Project Structure

- `pages/` - Next.js pages and API routes
- `components/` - React components
- `utils/` - Utility functions and helpers
- `store/` - State management (using Zustand)
- `public/` - Static assets

## Key Components

- `WalletProviderLayout` - Provides Solana wallet context to the app
- `TokenGatedPage` - Implements token-gating logic (TODO)
- `OptionsThemeSelector` - Allows users to switch between visual themes

## Middleware (WIP)

The app uses Next.js middleware for server-side token-gating. Check `middleware.ts` for implementation details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
