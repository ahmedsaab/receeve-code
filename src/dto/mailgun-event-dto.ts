export interface MailgunEventDto {
  id: string,
  event: EventType,
  timestamp: number,
  [propName: string]: any;
}

export type EventType = "accepted" | "rejected" | "delivered" | "failed" |
  "opened" | "clicked" | "unsubscribed" | "complained" | "stored";
