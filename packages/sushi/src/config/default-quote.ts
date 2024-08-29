import { ChainId, natives } from '../chain/index.js'
import {
  ARB,
  BUSD,
  GNO,
  Native,
  OP,
  SUSHI,
  Token,
  USDB,
  USDC,
  USDT,
  WETH9,
  axlUSDC,
} from '../currency/index.js'

export const defaultCurrency = {
  ...Object.fromEntries(
    Object.keys(natives).map((key) => [key, Native.onChain(Number(key))]),
  ),
  [ChainId.SKALE_EUROPA]: WETH9[ChainId.SKALE_EUROPA],
} as const

export const defaultQuoteCurrency = {
  [ChainId.ETHEREUM]: SUSHI[ChainId.ETHEREUM],
  [ChainId.SEPOLIA]: USDC[ChainId.SEPOLIA],
  // [ChainId.ROPSTEN]: SUSHI[ChainId.ROPSTEN],
  // [ChainId.RINKEBY]: SUSHI[ChainId.RINKEBY],
  // [ChainId.GÖRLI]: SUSHI[ChainId.GÖRLI],
  // [ChainId.KOVAN]: SUSHI[ChainId.KOVAN],
  [ChainId.POLYGON]: SUSHI[ChainId.POLYGON],
  // [ChainId.POLYGON_TESTNET]: SUSHI[ChainId.POLYGON_TESTNET],
  [ChainId.FANTOM]: axlUSDC[ChainId.FANTOM],
  // [ChainId.FANTOM_TESTNET]: SUSHI[ChainId.FANTOM_TESTNET],
  [ChainId.GNOSIS]: GNO[ChainId.GNOSIS],
  [ChainId.BSC]: BUSD[ChainId.BSC],
  // [ChainId.BSC_TESTNET]: SUSHI[ChainId.BSC_TESTNET],
  [ChainId.ARBITRUM]: ARB[ChainId.ARBITRUM],
  [ChainId.ARBITRUM_NOVA]: ARB[ChainId.ARBITRUM_NOVA],
  // [ChainId.ARBITRUM_TESTNET]: 'SUSHI',
  [ChainId.AVALANCHE]: USDC[ChainId.AVALANCHE],
  // [ChainId.AVALANCHE_TESTNET]: 'SUSHI',
  [ChainId.HECO]: USDC[ChainId.HECO],
  // [ChainId.HECO_TESTNET]: 'SUSHI',
  [ChainId.HARMONY]: USDC[ChainId.HARMONY],
  // [ChainId.HARMONY_TESTNET]: 'SUSHI',
  [ChainId.OKEX]: USDC[ChainId.OKEX],
  // [ChainId.OKEX_TESTNET]: 'SUSHI',
  [ChainId.CELO]: USDC[ChainId.CELO],
  // [ChainId.PALM]: SUSHI[ChainId.PALM],
  [ChainId.MOONRIVER]: USDC[ChainId.MOONRIVER],
  [ChainId.FUSE]: USDC[ChainId.FUSE],
  [ChainId.TELOS]: USDC[ChainId.TELOS],
  [ChainId.MOONBEAM]: axlUSDC[ChainId.MOONBEAM],
  [ChainId.OPTIMISM]: OP[ChainId.OPTIMISM],
  [ChainId.KAVA]: axlUSDC[ChainId.KAVA],
  [ChainId.METIS]: USDC[ChainId.METIS],
  [ChainId.BOBA]: USDC[ChainId.BOBA],
  [ChainId.BOBA_AVAX]: new Token({
    chainId: ChainId.BOBA_AVAX,
    address: '0x4200000000000000000000000000000000000023',
    decimals: 18,
    symbol: 'AVAX',
    name: 'Avalanche',
  }),
  [ChainId.BOBA_BNB]: new Token({
    chainId: ChainId.BOBA_BNB,
    address: '0x4200000000000000000000000000000000000023',
    decimals: 18,
    symbol: 'BNB',
    name: 'Binance Coin',
  }),
  [ChainId.BTTC]: USDC[ChainId.BTTC],
  [ChainId.THUNDERCORE]: USDC[ChainId.THUNDERCORE],
  // [ChainId.SEPOLIA]: USDT[ChainId.SEPOLIA],
  // [ChainId.CONSENSUS_ZKEVM_TESTNET]: WETH9[ChainId.CONSENSUS_ZKEVM_TESTNET],
  // [ChainId.SCROLL_ALPHA_TESTNET]: WETH9[ChainId.SCROLL_ALPHA_TESTNET],
  // [ChainId.BASE_TESTNET]: WETH9[ChainId.BASE_TESTNET],
  [ChainId.POLYGON_ZKEVM]: USDC[ChainId.POLYGON_ZKEVM],
  [ChainId.HAQQ]: USDC[ChainId.HAQQ],
  [ChainId.CORE]: USDC[ChainId.CORE],
  [ChainId.ZKSYNC_ERA]: USDC[ChainId.ZKSYNC_ERA],
  [ChainId.LINEA]: axlUSDC[ChainId.LINEA],
  [ChainId.BASE]: axlUSDC[ChainId.BASE],
  [ChainId.SCROLL]: USDC[ChainId.SCROLL],
  [ChainId.FILECOIN]: axlUSDC[ChainId.FILECOIN],
  [ChainId.ZETACHAIN]: WETH9[ChainId.ZETACHAIN],
  [ChainId.CRONOS]: WETH9[ChainId.CRONOS],
  [ChainId.BLAST]: USDB[ChainId.BLAST],
  [ChainId.SKALE_EUROPA]: USDC[ChainId.SKALE_EUROPA],
  [ChainId.ROOTSTOCK]: USDT[ChainId.ROOTSTOCK],
  [ChainId.MANTLE]: WETH9[ChainId.MANTLE],
} as const
