import express, { Request, Response, NextFunction } from "express";
import { validateRequest } from "../middlewares/validate-requests";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { generateJWTtoken } from "../services/generateJWTtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(new BadRequestError("Invalid Credentials"));
    }
    const passwordsMatch = await Password.comparePassword(
      existingUser?.password,
      password
    );
    if (!passwordsMatch) {
      return next(new BadRequestError("Invalid Credentials"));
    }
    const jwtToken = generateJWTtoken(existingUser?.id, email);
    req.session = { jwt: jwtToken };
    res.status(200).json({ existingUser });
  }
);

export { router as signinRouter };
