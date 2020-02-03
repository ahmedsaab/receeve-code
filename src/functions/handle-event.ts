import { Db, Logger, Notification } from "../config/context";
import { generateErrorResponse, generateSuccessResponse } from "../http/http-response-factory";
import { MailgunEventDto } from "../dto/mailgun-event-dto";
import { ILambdaHttpResponse } from "../http/http-response";

export default async (lambdaEvent): Promise<ILambdaHttpResponse> => {
  try {
    const event: MailgunEventDto = JSON.parse(lambdaEvent.body.toString());

    await Notification.publish<MailgunEventDto>(event);
    await Db.create(event);

    return generateSuccessResponse()
  } catch (error) {
    Logger.error("Failed to process request", error);
    console.error(error)

    return generateErrorResponse(error);
  }
};
