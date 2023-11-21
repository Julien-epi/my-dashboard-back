import { Request, Response } from 'express';
import * as coinGeckoService from '../services/coinGeckoService';

export const getPopularyCryptoController = async (req: Request, res: Response) => {
  try {
    const balances = await coinGeckoService.getCryptoPopulary();
    res.json(balances);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Binance data' });
  }
};
