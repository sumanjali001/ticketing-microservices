import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@ticketing2431/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
