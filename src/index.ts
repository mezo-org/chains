import { defineChain } from "viem"

/**
 * The Mezo Testnet chain.
 */
export const mezoTestnet = defineChain({
  id: 31611,
  name: "Mezo Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Bitcoin",
    symbol: "BTC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.test.mezo.org"],
      webSocket: ["wss://rpc-ws.test.mezo.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Mezo Testnet Explorer",
      url: "https://explorer.test.mezo.org",
    },
  },
})

/**
 * The Mezo Mainnet chain.
 */
export const mezoMainnet = defineChain({
  id: 31612,
  name: "Mezo Mainnet",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://mainnet.mezo.public.validationcloud.io",
        "https://rpc_evm-mezo.imperator.co",
        "https://jsonrpc-mezo.boar.network",
      ],
      webSocket: [
        "wss://mainnet.mezo.public.validationcloud.io",
        "wss://ws_evm-mezo.imperator.co",
        "wss://jsonrpcws-mezo.boar.network",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Mezo Mainnet Explorer",
      url: "https://explorer.mezo.org",
    },
  },
})

/**
 * Create a Mezo chain with optional custom RPC URLs.
 * If no options are provided, the default public RPC URLs for the network are used.
 * @param options The options for the Mezo chain.
 * @param options.network The network to use (default: mainnet).
 * @param options.rpcUrls The RPC URLs to use (default: the default public RPC
 *        URLs for the network).
 * @returns The Mezo chain with custom RPC URLs if provided.
 */
export const createMezoChain = (options?: {
  network?: "mainnet" | "testnet"
  rpcUrls?: {
    http: string[]
    webSocket?: string[]
  }
}) => {
  const network = options?.network === "testnet" ? "testnet" : "mainnet"
  const baseChain = network === "testnet" ? mezoTestnet : mezoMainnet

  return defineChain({
    ...baseChain,
    rpcUrls: {
      default: {
        http: options?.rpcUrls?.http || baseChain.rpcUrls.default.http,
        webSocket:
          options?.rpcUrls?.webSocket || baseChain.rpcUrls.default.webSocket,
      },
    },
  })
}

export { defineChain } from "viem"
