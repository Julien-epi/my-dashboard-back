import { Request, Response } from "express";
import {
  addInvestmentService,
  updateInvestmentService,
  deleteInvestmentService,
  getAllInvestmentsService,
  getInvestmentByIdService,
} from "../services/investmentService";

export const addInvestmentController = async (req: Request, res: Response) => {
  try {
    const investment = await addInvestmentService(req.body);
    res.status(201).send(investment);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const updateInvestmentController = async (req: Request, res: Response) => {
  try {
    const investment = await updateInvestmentService(req.params.id, req.body);
    res.send(investment);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const deleteInvestmentController = async (req: Request, res: Response) => {
  try {
    const result = await deleteInvestmentService(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const getAllInvestmentsController = async (req: Request, res: Response) => {
  try {
    const investments = await getAllInvestmentsService();
    res.send(investments);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};

export const getInvestmentByIdController = async (req: Request, res: Response) => {
  try {
    const investment = await getInvestmentByIdService(req.params.id);
    res.send(investment);
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
}
};
