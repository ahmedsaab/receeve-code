import { SNS } from 'aws-sdk';
import * as Sinon from 'sinon';
import 'reflect-metadata';

import MockLoggingService from "../mocks/mock.logging-service";
import MockConfigService from "../mocks/mock.config-service";
import SNService from '../../src/services/aws.notification-service';
import { MOCK_EVENT } from "../mocks/mock.event";
import { INotificationService } from "../../src/services/interfaces/notification-service";
import { ILoggingService } from "../../src/services/interfaces/logging-service";
import { IConfigService } from "../../src/services/interfaces/config-service";

describe('SNService', () => {
  let service: INotificationService;
  let logger: ILoggingService;
  let config: IConfigService;
  let sns: SNS;

  before(() => {
    logger = new MockLoggingService();
    config = new MockConfigService();
    sns = new SNS();

    service = new SNService(sns, logger, config);
  });

  beforeEach(() => {
    Sinon.stub(sns, 'publish').returns({
      promise: () => Promise.resolve({
        MessageId: '1234'
      }),
    } as any);
  });

  afterEach(() => {
    (sns.publish as Sinon.SinonStub).restore();
  });

  describe('publish()', () => {
    beforeEach(async () => {
      await service.publish(MOCK_EVENT)
    });

    it('should publish the expected string to the expected SNS Topic', () => {
      Sinon.assert.calledWith(sns.publish as Sinon.SinonStub, {
        Message: JSON.stringify(MOCK_EVENT),
        TopicArn:  config.SNS_TOPIC_ARN,
      });
    });

    it('should log the expected message', () => {
      Sinon.assert.calledWith(
        logger.info as Sinon.SinonStub,
        'event published to SNS',
        '1234'
      );
    });
  });
});
