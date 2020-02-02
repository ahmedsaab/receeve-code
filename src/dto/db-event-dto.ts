import { MailgunEventDto } from "./mailgun-event-dto";

export interface DbEventDto {
  _id: string,
  data: MailgunEventDto
}
