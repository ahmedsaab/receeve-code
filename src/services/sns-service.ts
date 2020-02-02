import * as AWS from 'aws-sdk';
import config from "../config";

const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

export async function publish<T>(message: T) {
  return sns.publish({
    Message: JSON.stringify(message),
    TopicArn:  config.SNS_TOPIC_ARN,
  }).promise();
}
