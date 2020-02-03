import { Db, MongoClient } from "mongodb";
import {inject, injectable, optional} from "inversify";

import { DbEventDto } from "../dto/db-event-dto";
import { MailgunEventDto } from "../dto/mailgun-event-dto";
import { TYPES } from "../config/types";
import { IConfigService } from "./interfaces/config-service";
import { IDbService } from "./interfaces/db-service";
import { ILoggingService } from "./interfaces/logging-service";

@injectable()
export default class MongoDbService implements IDbService {
  private db: Db = null;

  constructor(
    @optional() private collection: string = 'events',
    @inject(TYPES.Logger) private logger: ILoggingService,
    @inject(TYPES.Config) private config: IConfigService
  ) {}

  private async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    const connection = await MongoClient.connect(
      this.config.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    this.db = connection.db();

    return this.db;
  }

  async create(event: MailgunEventDto): Promise<void> {
    await this.connect();

    const data: DbEventDto = {
      _id: event.id,
      data: event
    };

    const result = await this.db.collection(this.collection)
      .insertOne(data);

    this.logger.info("saved event to db", result.ops)
  }
}
