import * as sns from '../services/sns-service'
import { generateErrorResponse, generateSuccessResponse } from "../http/http-response-factory";
import { MailgunEventDto } from "../dto/mailgun-event-dto";

export default async (lambdaEvent) => {
  try {
    const event: MailgunEventDto = JSON.parse(lambdaEvent.body.toString());

    await sns.publish<MailgunEventDto>(event);

    return generateSuccessResponse()
  } catch (error) {
    console.error(error);

    return generateErrorResponse(error);
  }
};
