import mongoose from "mongoose";

export interface Investment {
    name: string;
    quantity: string;
    potentialPriceMin: string;
    potentialProfitMin: string;
    potentialPriceMax: string;
    potentialProfitMax: string;
    averagePotentialProfit: string;
    investmentAmount: string;
    investmentDate?: Date;
    returnPercentage: number;
    user: mongoose.Schema.Types.ObjectId;
}