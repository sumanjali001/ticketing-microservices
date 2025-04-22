import { Publisher } from "@ticketing2431/common/build/events/base-publisher";
import { Subjects } from "@ticketing2431/common/build/events/subjects";
import { TicketUpdatedEvent } from "@ticketing2431/common/build/events/ticket-updated-event";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
