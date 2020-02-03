import { MailgunEventDto } from "../../dto/mailgun-event-dto";

export interface IDbService {
  create(event: MailgunEventDto): Promise<void>;
}
