import { Router } from "express";
import { createUser, getUsers } from "../controllers/userControllers.js";
import avatar from "../middlewares/multerMiddleware.js";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.post("/register", avatar, createUser);

export default usersRouter;
