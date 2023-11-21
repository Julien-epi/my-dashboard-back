import { Express } from 'express';
import * as BinanceController from '../controllers/binanceController';

export const binanceRoutes = (app: Express) => {
    app.get('/getStakingHistoryFromBinance', BinanceController.getBalances); // J'ai renommé la route pour qu'elle soit plus claire.
};
