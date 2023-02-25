import { Router } from "express";
import { createUser, getUsers } from "../controllers/userControllers.js";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.post("/register", createUser);

export default usersRouter;
