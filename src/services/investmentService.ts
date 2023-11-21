import investmentSchema from "../models/Investment";
import { Investment } from "../interfaces/Investment";


const calculatePotentialProfits = (data: Investment) => {
  const quantity = parseFloat(data.quantity);
  const potentialPriceMin = parseFloat(data.potentialPriceMin);
  const potentialPriceMax = parseFloat(data.potentialPriceMax);
  const investmentAmount = parseFloat(data.investmentAmount);

  const potentialProfitMin = quantity * potentialPriceMin - investmentAmount;
  const potentialProfitMax = quantity * potentialPriceMax - investmentAmount;

  return { potentialProfitMin, potentialProfitMax };
};

export const addInvestmentService = async (data: Investment) => {
  // Vérifiez si l'investissement existe déjà
  const investmentExist = await investmentSchema.findOne({ name: data.name });
  if (investmentExist) {
    throw new Error("Investment with this name already exists");
  }

  // Calcul des bénéfices potentiels
  const { potentialProfitMin, potentialProfitMax } = calculatePotentialProfits(data);
  const averagePotentialProfit = (potentialProfitMin + potentialProfitMax) / 2;

  const newInvestment = new investmentSchema({
    ...data,
    potentialProfitMin: potentialProfitMin.toString(),
    potentialProfitMax: potentialProfitMax.toString(),
    averagePotentialProfit: averagePotentialProfit.toString(),
  });
  console.log("🚀 ~ file: investmentService.ts:34 ~ addInvestmentService ~ newInvestment:", newInvestment)

  return newInvestment.save();
};

export const updateInvestmentService = async (investmentId: string, data: Partial<Investment>) => {
  try {
    const investment = await investmentSchema.findByIdAndUpdate(investmentId, data, {
      new: true,
    });

    if (!investment) {
      throw new Error("Investment not found");
    }

    return investment;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating the investment");
  }
};

export const deleteInvestmentService = async (investmentId: string) => {
  try {
    const investment = await investmentSchema.findByIdAndDelete(investmentId);

    if (!investment) {
      throw new Error("Investment not found");
    }

    return { message: "Investment deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting the investment");
  }
};

export const getAllInvestmentsService = async () => {
  try {
    const investments = await investmentSchema.find();

    if (!investments || investments.length === 0) {
      throw new Error("No investments found");
    }

    return investments;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching investments");
  }
};

export const getInvestmentByIdService = async (investmentId: string) => {
  try {
    const investment = await investmentSchema.findById(investmentId);

    if (!investment) {
      throw new Error("Investment not found");
    }

    return investment;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching the investment");
  }
};
