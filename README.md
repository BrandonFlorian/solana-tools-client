# Next.js Solana Ready App

## Overview

This Next.js application started as a re-implementation of one of my favorite libraries Nes.css. 

There are some react implementation out there already of Nes.css, but they were out of date or had some issues so I decided to just recreate the features myself using shadcn as a component base, and tailwind for styling. This repo will be updated as I complete the individual components. 

I have set up a theme store in this app with zustand, and if you navigate to the options menu, it features a modern, responsive design with light and dark themes, including pixel art inspired "NES" and "SNES" modes.

Integrates with Solana wallets to provide a quick set up for a front end to begin using dApps on Solana blockchain. 

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
- `OptionsThemeSelector` - Allows users to switch between visual themes

## Middleware (WIP)

The app uses Next.js middleware for server-side token-gating. Check `middleware.ts` for implementation details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
