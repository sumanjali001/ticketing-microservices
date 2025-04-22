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
import { createChargeRouter } from "./routes/newPayment";

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
app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
