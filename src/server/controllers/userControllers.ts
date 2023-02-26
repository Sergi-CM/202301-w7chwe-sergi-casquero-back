import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../database/models/User.js";
import CustomError from "../CustomError.js";
import { type UserRegister } from "../types.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't find users"
    );

    next(customError);
  }
};

export const createUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserRegister>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const avatar = req.file?.filename;

    await User.create({
      name,
      username,
      password: hashedPassword,
      avatar,
      email,
    });

    const message = "User registered successfully";

    res.status(201).json({ username, message });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      400,
      "Couldn't create the user"
    );

    next(customError);
  }
};
