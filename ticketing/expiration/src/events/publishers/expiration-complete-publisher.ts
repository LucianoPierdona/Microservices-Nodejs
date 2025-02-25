import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@lpjtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
