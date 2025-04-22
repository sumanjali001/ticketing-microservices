import express from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  console.log("COOKIES:", req.headers.cookie);
  console.log("SESSION JWT:", req.session?.jwt);
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
