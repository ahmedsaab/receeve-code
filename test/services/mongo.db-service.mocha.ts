import * as Sinon from 'sinon';
import 'reflect-metadata';

import MockLoggingService from "../mocks/mock.logging-service";
import MockConfigService from "../mocks/mock.config-service";
import MongoDbService from "../../src/services/mongo.db-service";
import { MOCK_EVENT } from "../mocks/mock.event";
import { ILoggingService } from "../../src/services/interfaces/logging-service";
import { IConfigService } from "../../src/services/interfaces/config-service";
import { IDbService } from "../../src/services/interfaces/db-service";
import { MongoClient } from "mongodb";

describe('SNService', () => {
  let service: IDbService;
  let logger: ILoggingService;
  let config: IConfigService;
  let insertOneStub: Sinon.SinonStub;

  before(() => {
    logger = new MockLoggingService();
    config = new MockConfigService();

    service = new MongoDbService('dummy', logger, config);
  });

  beforeEach(() => {
    insertOneStub = Sinon.stub();
    Sinon.stub(MongoClient, 'connect').resolves({
      db: () => ({
        collection: () => ({
          insertOne: insertOneStub
        })
      }),
    });
  });

  afterEach(() => {
    (MongoClient.connect as Sinon.SinonStub).restore();
  });

  describe('create()', () => {
    beforeEach(async () => {
      insertOneStub.resolves({ ops: [{ data: 123 }] });
      await service.create(MOCK_EVENT)
    });

    it('should attempts to connect to the database', () => {
      Sinon.assert.called(MongoClient.connect as Sinon.SinonStub);
    });

    it('should save to the database', () => {
      Sinon.assert.calledWith(insertOneStub, {
        _id: MOCK_EVENT.id,
        data: MOCK_EVENT
      });
    });

    it('should log the expected message', () => {
      Sinon.assert.calledWith(logger.info as Sinon.SinonStub,
        'saved event to db',
        [{ data: 123 }]
      );
    });
  });
});
