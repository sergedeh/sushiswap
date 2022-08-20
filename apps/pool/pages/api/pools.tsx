import type { NextApiRequest, NextApiResponse } from 'next'

import { getPools, GetPoolsQuery } from '../../lib/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  const pairs = await getPools(req.query as unknown as GetPoolsQuery)
  res.status(200).send(JSON.stringify(pairs))
}