import express from "express";
import { json } from "body-parser";

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@ticketing2431/common";

import "express-async-errors";

import cookieSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { newOrderRouter } from "./routes/newOrder";
import { indexRouter } from "./routes/index";
import { getOrderRouter } from "./routes/getOrder";
import { deleteOrderRouter } from "./routes/deleteOrder";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use(
  cookieSession({
    signed: false,
    secure: false, // ⚠️ true for HTTPS/prod
  })
);
app.use(currentUser);
app.use(newOrderRouter);
app.use(indexRouter);
app.use(getOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
