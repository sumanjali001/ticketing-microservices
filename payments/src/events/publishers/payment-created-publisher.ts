import { PaymentCreatedEvent, Publisher, Subjects } from "@ticketing2431/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated=Subjects.PaymentCreated;
}