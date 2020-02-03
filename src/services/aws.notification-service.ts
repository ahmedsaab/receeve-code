import { SNS } from 'aws-sdk';
import { inject, injectable } from "inversify";

import { TYPES } from "../config/types";
import { INotificationService } from "./interfaces/notification-service";
import { ILoggingService } from "./interfaces/logging-service";
import { IConfigService } from "./interfaces/config-service";

@injectable()
export default class SNService implements INotificationService {
  constructor(
    @inject(TYPES.SNS) private sns: SNS,
    @inject(TYPES.Logger) private logger: ILoggingService,
    @inject(TYPES.Config) private config: IConfigService,
  ) {}

  async publish<T>(message: T): Promise<void> {
    const response = await this.sns.publish({
      Message: JSON.stringify(message),
      TopicArn:  this.config.SNS_TOPIC_ARN,
    }).promise();

    this.logger.info("event published to SNS", response.MessageId);
  }
}
