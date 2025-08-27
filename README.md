# @mezo/chains

Viem chain configuration for Mezo networks.

## Installation

```bash
npm install @mezo/chains
```

## Usage

### Mainnet

#### Default Configuration

```typescript
import { createPublicClient } from 'viem'
import { mezoMainnet } from '@mezo/chains'

const client = createPublicClient({
  chain: mezoMainnet,
  transport: http()
})
```

#### Custom RPC URLs

```typescript
import { createMezoChain } from '@mezo/chains'

const customChain = createMezoChain({
  rpcUrls: {
      http: ['https://your-private-rpc.com'],
      webSocket: ['wss://your-private-ws.com']
  }
})

const client = createPublicClient({
  chain: customChain,
  transport: http()
})
```

### Testnet

#### Default Configuration

```typescript
import { createPublicClient } from 'viem'
import { mezoTestnet } from '@mezo/chains'

const client = createPublicClient({
  chain: mezoTestnet,
  transport: http()
})
```

#### Custom RPC URLs

```typescript
import { createMezoChain } from '@mezo/chains'

const customChain = createMezoChain({
  network: "testnet",
  rpcUrls: {
      http: ['https://your-private-rpc.test.com'],
      webSocket: ['wss://your-private-ws.test.com']
  }
})

const client = createPublicClient({
  chain: customChain,
  transport: http()
})
```
