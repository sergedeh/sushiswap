import { ChainId } from '@sushiswap/chain'
import { BASES_TO_CHECK_TRADES_AGAINST } from '@sushiswap/router-config'
import { config } from '@sushiswap/viem-config'
import express, { Express, Request, Response } from 'express'
import { createPublicClient } from 'viem'
import z from 'zod'

import { Extractor, MultiCallAggregator, TokenManager } from '../src'
import { EXTRACTOR_CONFIG } from './config'

const SUPPORTED_CHAIN_IDS = [1] as const

type SupportChainId = (typeof SUPPORTED_CHAIN_IDS)[number]

export const isSupportedChainId = (chainId: number): chainId is SupportChainId =>
  SUPPORTED_CHAIN_IDS.includes(chainId as SupportChainId)

const querySchema = z.object({
  chainId: z.coerce
    .number()
    .int()
    .gte(0)
    .lte(2 ** 256)
    .default(ChainId.ETHEREUM)
    .refine((chainId) => isSupportedChainId(chainId), { message: 'ChainId not supported.' })
    .transform((chainId) => chainId as SupportChainId),
  tokenIn: z.string(),
  tokenOut: z.string(),
  amount: z.string().transform((amount) => BigInt(amount)),
})

const extractors = new Map<SupportChainId, Extractor>()
const tokenManagers = new Map<SupportChainId, TokenManager>()

async function setup() {
  for (const chainId of SUPPORTED_CHAIN_IDS) {
    const client = createPublicClient(config[chainId])
    const extractor = new Extractor({ ...EXTRACTOR_CONFIG[chainId], client })
    await extractor.start()

    const tokenManager = new TokenManager(
      extractor.extractorV2?.multiCallAggregator || (extractor.extractorV3?.multiCallAggregator as MultiCallAggregator),
      __dirname,
      `tokens-${chainId}`
    )
    await tokenManager.addCachedTokens()

    extractors.set(chainId, extractor)
    tokenManagers.set(chainId, tokenManager)
  }
}

async function main() {
  await setup()

  const app: Express = express()

  app.get('/', (req: Request, res: Response) => {
    console.log('HTTP: GET /', req.query)
    const { chainId, tokenIn, tokenOut, amount } = querySchema.parse(req.query)
    // console.log('HTTP: GET /', chainId, tokenIn, tokenOut, amount)
    if (!isSupportedChainId(chainId)) {
      throw new Error('chainId is not supported')
    }
    const extractor = extractors.get(chainId) as Extractor
    const tokens = BASES_TO_CHECK_TRADES_AGAINST[chainId]
    const poolCodes = extractor.getPoolCodesForTokens(tokens)
    return res.json(poolCodes)
  })

  app.get('/get-pool-codes-for-tokens', (req: Request, res: Response) => {
    console.log('HTTP: GET /get-pool-codes-for-tokens', req.query)
    const { chainId } = querySchema.parse(req.query)
    if (!isSupportedChainId(chainId)) {
      throw new Error('chainId is not supported')
    }
    const extractor = extractors.get(chainId) as Extractor
    const tokenManager = tokenManagers.get(chainId) as TokenManager
    const tokens = BASES_TO_CHECK_TRADES_AGAINST[chainId].concat(Array.from(tokenManager.tokens.values()).slice(0, 100))
    const poolCodes = extractor.getPoolCodesForTokens(tokens)
    return res.json(poolCodes)
  })

  app.get('/pool-codes', (req: Request, res: Response) => {
    console.log('HTTP: GET /pool-codes', req.query)
    const { chainId } = querySchema.parse(req.query)
    if (!isSupportedChainId(chainId)) {
      throw new Error('chainId is not supported')
    }
    const extractor = extractors.get(chainId) as Extractor
    const poolCodes = extractor.getCurrentPoolCodes()
    res.json(poolCodes)
  })

  app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })
}
main()