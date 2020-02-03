import * as AWS from 'aws-sdk';
import { inject, injectable } from "inversify";

import { TYPES } from "../config/types";
import { INotificationService } from "./interfaces/notification-service";
import { ILoggingService } from "./interfaces/logging-service";
import { IConfigService } from "./interfaces/config-service";

const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

@injectable()
export default class SNS implements INotificationService {
  constructor(
    @inject(TYPES.Logger) private logger: ILoggingService,
    @inject(TYPES.Config) private config: IConfigService
  ) {}

  async publish<T>(message: T): Promise<void> {
    const response = await sns.publish({
      Message: JSON.stringify(message),
      TopicArn:  this.config.SNS_TOPIC_ARN,
    }).promise();

    this.logger.info("event published to SNS", response.$response.data);
  }
}
