import mongoose from "mongoose";
import { Investment } from "../interfaces/Investment";

const investmentSchema = new mongoose.Schema<Investment>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  potentialPriceMin: {
    type: String,
    required: true, 
  },
  potentialProfitMin: {
    type: String,
    required: true,
  },
  potentialPriceMax: {
    type: String,
    required: true, 
  },
  potentialProfitMax: {
    type: String,
    required: true,
  },
  averagePotentialProfit: {
    type: String,
    required: true,
  },
  investmentAmount: {
    type: String,
    required: true,
  },
  investmentDate: {
    type: Date,
    default: Date.now,
  },
  returnPercentage: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<Investment>("Investment", investmentSchema);
