import { SchemaMap, string, object, validate } from "joi";

interface IConfig {
  MONGO_DB_URI?: string,
  SNS_TOPIC_ARN?: string;
}

const schemaMap: SchemaMap = {
  MONGO_DB_URI: string().required(),
  SNS_TOPIC_ARN: string().required(),
};
const config: IConfig = {};
const schema = object(schemaMap);

Object.keys(schemaMap).forEach((key) => {
  config[key] = process.env[key];
});

const { error } = validate(config,  schema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default config;
