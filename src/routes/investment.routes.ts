import { Express } from 'express';
import {
    addInvestmentController,
    updateInvestmentController,
    deleteInvestmentController,
    getAllInvestmentsController,
    getInvestmentByIdController
} from '../controllers/investmentController';

export const investmentRoutes = (app: Express) => {
    app.post('/addInvestment', addInvestmentController); // Create a new investment
    app.get('/getAllInvestments', getAllInvestmentsController); // Get all investments
    app.get('/getInvestmentById/:id', getInvestmentByIdController); // Get a single investment by ID
    app.put('/updateInvestment/:id', updateInvestmentController); // Update an investment by ID
    app.delete('/deleteInvestment/:id', deleteInvestmentController); // Delete an investment by ID
};
