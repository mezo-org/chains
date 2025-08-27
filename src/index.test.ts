import { describe, it, expect } from "vitest"
import { createMezoChain } from "./index"

describe("createMezoChain", () => {
  describe("default configuration", () => {
    it("should return mainnet chain when no options provided", () => {
      const chain = createMezoChain()

      expect(chain.id).toBe(31612)
      expect(chain.name).toBe("Mezo Mainnet")
      expect(chain.nativeCurrency).toEqual({
        name: "Bitcoin",
        symbol: "BTC",
        decimals: 18,
      })
      expect(chain.rpcUrls.default.http).toEqual([
        "https://mainnet.mezo.public.validationcloud.io",
        "https://rpc_evm-mezo.imperator.co",
        "https://jsonrpc-mezo.boar.network",
      ])
      expect(chain.rpcUrls.default.webSocket).toEqual([
        "wss://mainnet.mezo.public.validationcloud.io",
        "wss://ws_evm-mezo.imperator.co",
        "wss://jsonrpcws-mezo.boar.network",
      ])
      expect(chain.blockExplorers).toEqual({
        default: {
          name: "Mezo Mainnet Explorer",
          url: "https://explorer.mezo.org",
        },
      })
    })

    it("should return mainnet chain when empty options provided", () => {
      const chain = createMezoChain({})

      expect(chain.id).toBe(31612)
      expect(chain.name).toBe("Mezo Mainnet")
    })
  })

  describe("network option", () => {
    it("should return mainnet chain when network is mainnet", () => {
      const chain = createMezoChain({ network: "mainnet" })

      expect(chain.id).toBe(31612)
      expect(chain.name).toBe("Mezo Mainnet")
      expect(chain.rpcUrls.default.http).toEqual([
        "https://mainnet.mezo.public.validationcloud.io",
        "https://rpc_evm-mezo.imperator.co",
        "https://jsonrpc-mezo.boar.network",
      ])
    })

    it("should return testnet chain when network is testnet", () => {
      const chain = createMezoChain({ network: "testnet" })

      expect(chain.id).toBe(31611)
      expect(chain.name).toBe("Mezo Testnet")
      expect(chain.rpcUrls.default.http).toEqual(["https://rpc.test.mezo.org"])
    })
  })

  describe("custom RPC URLs", () => {
    it("should use custom HTTP RPC URLs for mainnet", () => {
      const customRpc = ["https://custom-rpc.example.com"]
      const chain = createMezoChain({
        network: "mainnet",
        rpcUrls: { http: customRpc },
      })

      expect(chain.id).toBe(31612)
      expect(chain.rpcUrls.default.http).toEqual(customRpc)
      expect(chain.rpcUrls.default.webSocket).toEqual([
        "wss://mainnet.mezo.public.validationcloud.io",
        "wss://ws_evm-mezo.imperator.co",
        "wss://jsonrpcws-mezo.boar.network",
      ])
    })

    it("should use custom HTTP RPC URLs for testnet", () => {
      const customRpc = ["https://custom-testnet-rpc.example.com"]
      const chain = createMezoChain({
        network: "testnet",
        rpcUrls: { http: customRpc },
      })

      expect(chain.id).toBe(31611)
      expect(chain.rpcUrls.default.http).toEqual(customRpc)
      expect(chain.rpcUrls.default.webSocket).toEqual([
        "wss://rpc-ws.test.mezo.org",
      ])
    })

    it("should use custom WebSocket RPC URLs", () => {
      const customWs = ["wss://custom-ws.example.com"]
      const chain = createMezoChain({
        network: "mainnet",
        rpcUrls: {
          http: ["https://custom-rpc.example.com"],
          webSocket: customWs,
        },
      })

      expect(chain.rpcUrls.default.webSocket).toEqual(customWs)
    })

    it("should use custom HTTP URLs only when webSocket not provided", () => {
      const customHttp = ["https://custom-only-http.example.com"]
      const chain = createMezoChain({
        rpcUrls: { http: customHttp },
      })

      expect(chain.rpcUrls.default.http).toEqual(customHttp)
      expect(chain.rpcUrls.default.webSocket).toEqual([
        "wss://mainnet.mezo.public.validationcloud.io",
        "wss://ws_evm-mezo.imperator.co",
        "wss://jsonrpcws-mezo.boar.network",
      ])
    })
  })

  describe("option combinations", () => {
    it("should handle testnet with custom RPC URLs", () => {
      const customHttp = ["https://custom-testnet.example.com"]
      const customWs = ["wss://custom-testnet-ws.example.com"]

      const chain = createMezoChain({
        network: "testnet",
        rpcUrls: {
          http: customHttp,
          webSocket: customWs,
        },
      })

      expect(chain.id).toBe(31611)
      expect(chain.name).toBe("Mezo Testnet")
      expect(chain.rpcUrls.default.http).toEqual(customHttp)
      expect(chain.rpcUrls.default.webSocket).toEqual(customWs)
      expect(chain.blockExplorers).toEqual({
        default: {
          name: "Mezo Testnet Explorer",
          url: "https://explorer.test.mezo.org",
        },
      })
    })

    it("should handle mainnet with custom RPC URLs", () => {
      const customHttp = [
        "https://custom-mainnet.example.com",
        "https://backup-mainnet.example.com",
      ]
      const customWs = ["wss://custom-mainnet-ws.example.com"]

      const chain = createMezoChain({
        network: "mainnet",
        rpcUrls: {
          http: customHttp,
          webSocket: customWs,
        },
      })

      expect(chain.id).toBe(31612)
      expect(chain.name).toBe("Mezo Mainnet")
      expect(chain.rpcUrls.default.http).toEqual(customHttp)
      expect(chain.rpcUrls.default.webSocket).toEqual(customWs)
      expect(chain.blockExplorers).toEqual({
        default: {
          name: "Mezo Mainnet Explorer",
          url: "https://explorer.mezo.org",
        },
      })
    })

    it("should preserve all other chain properties when using custom RPC URLs", () => {
      const chain = createMezoChain({
        network: "testnet",
        rpcUrls: { http: ["https://custom.example.com"] },
      })

      expect(chain.nativeCurrency).toEqual({
        decimals: 18,
        name: "Bitcoin",
        symbol: "BTC",
      })
      expect(chain.blockExplorers).toEqual({
        default: {
          name: "Mezo Testnet Explorer",
          url: "https://explorer.test.mezo.org",
        },
      })
    })
  })
})
