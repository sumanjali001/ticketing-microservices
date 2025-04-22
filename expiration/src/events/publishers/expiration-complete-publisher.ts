import { Publisher, Subjects } from "@ticketing2431/common";
import {ExpirationCompleteEvent} from "@ticketing2431/common/build/events/expiration-complete-event"

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete=Subjects.ExpirationComplete;
}