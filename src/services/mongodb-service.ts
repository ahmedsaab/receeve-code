import { Db, MongoClient } from "mongodb";
import { DbEventDto } from "../dto/db-event-dto";
import { MailgunEventDto } from "../dto/mailgun-event-dto";

import config from "../config";

export class MongodbService {
  private collection: string;
  private db: Db = null;

  constructor(collectionName: string) {
    this.collection = collectionName;
  }

  private async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    const connection = await MongoClient.connect(
      config.MONGO_DB_URI, {
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

    await this.db.collection(this.collection)
      .insertOne(data);
  }
}

export default new MongodbService('events');
