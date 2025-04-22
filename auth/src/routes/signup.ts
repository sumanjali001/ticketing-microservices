import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-errors";
import { error } from "console";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { generateJWTtoken } from "../services/generateJWTtoken";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password length not matching"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    // 🛑 If validation errors exist, pass error to error-handling middleware
    if (!errors.isEmpty()) {
      return next(new RequestValidationError(errors.array())); // ✅ Error handled correctly
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new BadRequestError("User already exists"));
    }
    const user = User.build({ email, password });
    await user.save();

    //generate jwt
    const jwtToken = generateJWTtoken(user.id, user.email);

    //store it in session object
    req.session = {
      jwt: jwtToken,
    };

    // ✅ Send a response to prevent hanging requests
    res.status(201).json(user);
  }
);

export { router as signupRouter };
