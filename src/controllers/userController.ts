import { Request, Response } from "express";
import {
  RegisterService,
  AuthenticateService,
  UpdateUserService,
  DeleteUserService,
  getAllUsersService,
  getUserByIdService,
} from "../services/userService";

export const RegisterController = async (req: Request, res: Response): Promise<void> => {
  try {
      const userData = req.body;
      const newUser = await RegisterService(userData);
      
      res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
};

export const AuthenticateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await AuthenticateService(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log("🚀 ~ file: userController.ts:30 ~ error:", error)
    res.status(500).json(error.message);
  }
};

export const UpdateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id;

  if (typeof userId !== "string") {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    const result = await UpdateUserService(userId, req.body);
    res.status(200).json(result);
    return;
  } catch (error: any) {
    res.status(500).json(error.message);
    return;
  }
};

export const DeleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const result = await DeleteUserService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const GetAllUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAllUsersService();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const GetUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const result = await getUserByIdService(userId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
