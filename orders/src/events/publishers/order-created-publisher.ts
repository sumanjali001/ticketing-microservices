import { OrderCreatedEvent, Publisher, Subjects } from "@ticketing2431/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
