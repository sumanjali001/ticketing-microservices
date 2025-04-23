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
import { signinRouter } from "./routes/sigin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-user";


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

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
