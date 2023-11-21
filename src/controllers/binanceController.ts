import { Request, Response } from 'express';
import * as BinanceService from '../services/binanceService';

export const getBalances = async (req: Request, res: Response) => {
  try {
    const product = typeof req.query.product === 'string' ? req.query.product : 'default_product';
    const txnType = typeof req.query.txnType === 'string' ? req.query.txnType : 'default_txnType';

    const balances = await BinanceService.getStakingHistory(product, txnType);
    res.json(balances);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Binance data' });
  }
};
