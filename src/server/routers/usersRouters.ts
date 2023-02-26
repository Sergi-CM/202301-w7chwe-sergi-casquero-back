import { Router } from "express";
import { validate } from "express-validation";
import {
  createUser,
  getUsers,
  loginUser,
} from "../controllers/userControllers.js";
import avatar from "../middlewares/multerMiddleware.js";
import loginSchema from "../schemas/loginSchema.js";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.post(
  "/login",
  // Validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);
usersRouter.post("/register", avatar, createUser);

export default usersRouter;
