import { Express } from 'express';
import { RegisterController, AuthenticateController } from '../controllers/userController';

export const userRoutes = (app: Express) => {
    app.post('/register', RegisterController);
    app.post('/login', AuthenticateController);
};
