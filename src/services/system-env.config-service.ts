import { string, object } from "@hapi/joi";
import { injectable } from "inversify";
import { IConfigService } from "./interfaces/config-service";

const schema = object({
  MONGO_DB_URI: string().required(),
  SNS_TOPIC_ARN: string().required(),
});

@injectable()
export default class SystemEnvConfigService implements IConfigService {
  public MONGO_DB_URI: string;
  public SNS_TOPIC_ARN: string;

  constructor() {
    SystemEnvConfigService.validate(process.env);

    this.MONGO_DB_URI = process.env.MONGO_DB_URI;
    this.SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;
  }

  private static validate(source): void {
    const { error } = schema.validate(source, { allowUnknown: true });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }
}
