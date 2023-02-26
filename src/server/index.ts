import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./routers/usersRouters.js";
import { generalError, notFoundError } from "./middlewares/errorsMiddleware.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
