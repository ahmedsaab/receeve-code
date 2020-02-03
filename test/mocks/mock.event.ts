import { MailgunEventDto } from "../../src/dto/mailgun-event-dto";

export const MOCK_EVENT: MailgunEventDto = {
  id: '123',
  event: 'opened',
  timestamp: 12345,
  someData: {
    boo: 1
  }
};
