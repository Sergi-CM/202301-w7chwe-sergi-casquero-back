import { Router } from "express";
import { getUsers } from "../controllers/userControllers.js";

// eslint-disable-next-line new-cap
const usersRouter = Router();

usersRouter.get("/", getUsers);

export default usersRouter;
