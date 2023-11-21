import bcrypt from "bcryptjs";
import userSchema from "../models/User";
import { IUser } from "../interfaces/User";

export const RegisterService = async (data: IUser) => {
  const userExists = await userSchema.findOne({ username: data.username });

  if (userExists) {
    throw new Error("Username already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const newUser = new userSchema({
    email: data.email,
    username: data.username,
    password: hashedPassword,
  });

  return newUser.save();
};

export const AuthenticateService = async (data: IUser) => {
    const user = await userSchema.findOne({ username: data.username });
    
    if (!user) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
    }
    
    const validPassword = await bcrypt.compare(data.password, user.password);
    
    if (!validPassword) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect");
    }
    
    return {
        _id: user._id,
        email: user.email,
        username: user.username
    };
}


export const UpdateUserService = async (userId: string, data: IUser) => {
  try {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const user = await userSchema.findByIdAndUpdate(userId, data, {
      new: true,
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  }
};

export const DeleteUserService = async (userId: string) => {
  try {
    const user = await userSchema.findByIdAndDelete(userId);

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return { message: "Utilisateur supprimé avec succès" };
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la suppression de l'utilisateur");
  }
};

export const getAllUsersService = async () => {
  try {
    const users = await userSchema.find();

    if (!users || users.length === 0) {
      throw new Error("Aucun utilisateur trouvé");
    }

    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }
};

export const getUserByIdService = async (userId: string) => {
  try {
    const user = await userSchema.findById(userId);

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération de l'utilisateur");
  }
};
