import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@ticketing2431/common";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";
import { TicketCreatedPublisher } from "../events/publisher/ticket-created-publisher";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    console.log(title, price, req.currentUser);
    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    console.log(ticket);
    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).Publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });
    res.status(201).send(ticket);
  }
);
export { router as createTicketRouter };
