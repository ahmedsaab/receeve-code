import { IConfigService } from "../../src/services/interfaces/config-service";

export default class MockConfigService implements IConfigService {
  MONGO_DB_URI = "mock db uri";
  SNS_TOPIC_ARN = "mock sns arn";
}
