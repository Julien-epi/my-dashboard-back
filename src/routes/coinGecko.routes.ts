import { Express } from 'express';
import * as coinGeckoController from '../controllers/coinGeckoController';

export const coinGeckoRoutes = (app: Express) => {
    app.get('/cryptoPopulary', coinGeckoController.getPopularyCryptoController);
};
