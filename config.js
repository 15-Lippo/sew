require("dotenv").config();

module.exports = {
  JUPITER_V6_API: "https://quote-api.jup.ag/v6",
  JITO_RPC_URL: "https://mainnet.block-engine.jito.wtf/api/v1/bundles",
  SOLANA_RPC_URL: process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com",
  WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
  FEE_WALLET: "EPqPP8mSk4bFNfk5cAg9hGR6XPLwh9Rp3Lo4wDiLEdrZ",
  FEE_PERCENTAGE: 0.22,
  APP_NAME: "Binar"
};
