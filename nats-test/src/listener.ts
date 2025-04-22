import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "@ticketing2431/common/build/events/ticket-created-listener";
console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "nats://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to nats");
  stan.on("close", () => {
    console.log("nats connection closed");
    process.exit();
  });
  new TicketCreatedListener(stan).listen();
});
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
