export const ERC20_ABI = [
  {type: "function", name: "balanceOf", inputs: [{name: "account", type: "address"}], outputs: [{name: "", type: "uint256"}], stateMutability: "view"},
  {type: "function", name: "approve", inputs: [{name: "spender", type: "address"}, {name: "amount", type: "uint256"}], outputs: [{name: "", type: "bool"}], stateMutability: "nonpayable"},
  {type: "function", name: "allowance", inputs: [{name: "owner", type: "address"}, {name: "spender", type: "address"}], outputs: [{name: "", type: "uint256"}], stateMutability: "view"},
  {type: "function", name: "symbol", inputs: [], outputs: [{name: "", type: "string"}], stateMutability: "view"},
  {type: "function", name: "decimals", inputs: [], outputs: [{name: "", type: "uint8"}], stateMutability: "view"},
  {type: "function", name: "mint", inputs: [{name: "to", type: "address"}, {name: "amount", type: "uint256"}], outputs: [], stateMutability: "nonpayable"},
] as const

export const TOKENS = {
  INIT: {
    address: "0x7BA4453802bA28D6EaC9117E32EC67FDFC7E6f90" as `0x${string}`,
    name: "INIT",
    subtitle: "Initia Network",
    logo: "/Assets/Images/Logo/init-logo.png",
    decimals: 18,
    yieldSource: {
      protocol: "Enshrined Liquidity",
      description: "Yield from INIT-USDC LP rewards via Initia Enshrined Liquidity. The protocol stakes deposited INIT into native liquidity pools and locks in the current rate as your fixed return.",
      mechanism: "LP Staking Rewards",
      underlying: "INIT-USDC LP",
    },
  },
  sINIT: {
    address: "0x668188d659dCa10adb4c69fB86Ae877414deA30E" as `0x${string}`,
    name: "sINIT",
    subtitle: "Liquid Staking",
    logo: "/Assets/Images/Logo/inertia-logo.png",
    decimals: 18,
    yieldSource: {
      protocol: "Inertia",
      description: "Yield from INIT staking rewards via Inertia liquid staking. sINIT accrues staking yield over time and the protocol locks in the current rate as your fixed return.",
      mechanism: "Liquid Staking Rewards",
      underlying: "Staked INIT (sINIT)",
    },
  },
  USDe: {
    address: "0xc4762d119A39b943921bF4777EFe39BF373F7c15" as `0x${string}`,
    name: "USDe",
    subtitle: "Ethena Stablecoin",
    logo: "/Assets/Images/Logo/usde-logo.svg",
    decimals: 18,
    yieldSource: {
      protocol: "Ethena",
      description: "Yield from Ethena sUSDe staking and delta-neutral strategy. The protocol deposits USDe into Ethena vaults and locks in the current rate as your fixed return.",
      mechanism: "Delta-Neutral Yield",
      underlying: "Staked USDe (sUSDe)",
    },
  },
} as const

export const TOKEN_LIST = Object.values(TOKENS)

export const FIXED_YIELD_VAULT = {
  address: "0x9fA35B449D0363893B6Fcb6781C82c817f4A0bED" as `0x${string}`,
  abi: [
    {
      type: "function",
      name: "deposit",
      inputs: [
        {name: "asset", type: "address"},
        {name: "amount", type: "uint256"},
      ],
      outputs: [{name: "positionId", type: "uint256"}],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "withdrawByAsset",
      inputs: [
        {name: "asset", type: "address"},
        {name: "positionId", type: "uint256"},
      ],
      outputs: [{name: "payout", type: "uint256"}],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "withdraw",
      inputs: [{name: "positionId", type: "uint256"}],
      outputs: [{name: "payout", type: "uint256"}],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getPosition",
      inputs: [
        {name: "user", type: "address"},
        {name: "positionId", type: "uint256"},
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          components: [
            {name: "principal", type: "uint256"},
            {name: "fixedRate", type: "uint256"},
            {name: "maturity", type: "uint256"},
            {name: "depositedAt", type: "uint256"},
            {name: "withdrawn", type: "bool"},
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getPositionCount",
      inputs: [{name: "user", type: "address"}],
      outputs: [{name: "", type: "uint256"}],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getUserPositions",
      inputs: [{name: "user", type: "address"}],
      outputs: [
        {
          name: "",
          type: "tuple[]",
          components: [
            {name: "principal", type: "uint256"},
            {name: "fixedRate", type: "uint256"},
            {name: "maturity", type: "uint256"},
            {name: "depositedAt", type: "uint256"},
            {name: "withdrawn", type: "bool"},
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getVaultConfig",
      inputs: [{name: "asset", type: "address"}],
      outputs: [
        {name: "fixedRate", type: "uint256"},
        {name: "duration", type: "uint256"},
        {name: "cap", type: "uint256"},
        {name: "totalDeposited", type: "uint256"},
        {name: "active", type: "bool"},
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getVaultTVL",
      inputs: [{name: "asset", type: "address"}],
      outputs: [{name: "", type: "uint256"}],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getSupportedAssets",
      inputs: [],
      outputs: [{name: "", type: "address[]"}],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "calculateYield",
      inputs: [
        {name: "principal", type: "uint256"},
        {name: "fixedRate", type: "uint256"},
        {name: "depositedAt", type: "uint256"},
        {name: "maturity", type: "uint256"},
      ],
      outputs: [{name: "", type: "uint256"}],
      stateMutability: "pure",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [{name: "", type: "address"}],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "paused",
      inputs: [],
      outputs: [{name: "", type: "bool"}],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "configureVault",
      inputs: [
        {name: "asset", type: "address"},
        {name: "fixedRate", type: "uint256"},
        {name: "duration", type: "uint256"},
        {name: "cap", type: "uint256"},
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "fundVault",
      inputs: [
        {name: "asset", type: "address"},
        {name: "amount", type: "uint256"},
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "Deposited",
      inputs: [
        {name: "user", type: "address", indexed: true},
        {name: "positionId", type: "uint256", indexed: true},
        {name: "asset", type: "address", indexed: true},
        {name: "amount", type: "uint256", indexed: false},
        {name: "fixedRate", type: "uint256", indexed: false},
        {name: "maturity", type: "uint256", indexed: false},
      ],
    },
    {
      type: "event",
      name: "Withdrawn",
      inputs: [
        {name: "user", type: "address", indexed: true},
        {name: "positionId", type: "uint256", indexed: true},
        {name: "principal", type: "uint256", indexed: false},
        {name: "yield", type: "uint256", indexed: false},
      ],
    },
    {
      type: "event",
      name: "EarlyWithdrawn",
      inputs: [
        {name: "user", type: "address", indexed: true},
        {name: "positionId", type: "uint256", indexed: true},
        {name: "principal", type: "uint256", indexed: false},
        {name: "penalty", type: "uint256", indexed: false},
      ],
    },
  ] as const,
} as const
