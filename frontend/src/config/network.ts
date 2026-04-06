import { defineChain } from "viem"

export const LETICIA_ROLLUP = {
  chainId: "leticia-rollup-7",
  prettyName: "Leticia Rollup",
  rpc: "http://localhost:26657",
  rest: "http://localhost:1317",
  jsonRpc: "http://localhost:8545",
  jsonRpcWs: "ws://localhost:8546",
  grpc: "http://localhost:9090",
  bech32Prefix: "init",
  slip44: 118,
  gasDenom: "GAS",
  gasAdjustment: 1.5,
  maxGasLimit: 25000000,
  vm: "evm" as const,
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LETICIA_CUSTOM_CHAIN: any = {
  chain_id: LETICIA_ROLLUP.chainId,
  chain_name: "leticia-rollup",
  pretty_name: LETICIA_ROLLUP.prettyName,
  network_type: "testnet",
  bech32_prefix: LETICIA_ROLLUP.bech32Prefix,
  apis: {
    rpc: [{ address: LETICIA_ROLLUP.rpc }],
    rest: [{ address: LETICIA_ROLLUP.rest }],
    indexer: [{ address: LETICIA_ROLLUP.rest }],
    "json-rpc": [{ address: LETICIA_ROLLUP.jsonRpc }],
  },
  fees: {
    fee_tokens: [
      {
        denom: LETICIA_ROLLUP.gasDenom,
        fixed_min_gas_price: 0,
        low_gas_price: 0,
        average_gas_price: 0,
        high_gas_price: 0,
      },
    ],
  },
  metadata: {
    minitia: { type: "minievm" },
    is_l1: false,
  },
}

export const L1_NETWORK = {
  chainId: "initiation-2",
  prettyName: "Initia Testnet",
  rpc: "https://rpc.testnet.initia.xyz:443",
} as const

export const leticiaEvmChain = defineChain({
  id: 7,
  name: LETICIA_ROLLUP.prettyName,
  nativeCurrency: {
    name: "GAS",
    symbol: "GAS",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [LETICIA_ROLLUP.jsonRpc],
      webSocket: [LETICIA_ROLLUP.jsonRpcWs],
    },
  },
})
