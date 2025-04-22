import { Publisher } from "@ticketing2431/common/build/events/base-publisher";
import { Subjects } from "@ticketing2431/common/build/events/subjects";
import { TicketCreatedEvent } from "@ticketing2431/common/build/events/ticket-created-event";
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
