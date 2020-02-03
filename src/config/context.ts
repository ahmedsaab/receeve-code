import "reflect-metadata";
import { Container } from "inversify";

import { IDbService } from "../services/interfaces/db-service";
import { INotificationService } from "../services/interfaces/notification-service";
import { ILoggingService } from "../services/interfaces/logging-service";
import { IConfigService } from "../services/interfaces/config-service";

import Console from "../services/console.logging-service";
import SNS from "../services/aws.notification-service";
import MongoDbService from "../services/mongo.db-service";
import SysEnvConfig from "../services/system-env.config-service";
import { TYPES } from "./types";

const container: Container = new Container();

container.bind<ILoggingService>(TYPES.Logger).to(Console);
container.bind<IDbService>(TYPES.Db).to(MongoDbService);
container.bind<INotificationService>(TYPES.Notification).to(SNS);
container.bind<IConfigService>(TYPES.Config).to(SysEnvConfig);

export const Logger = container.get<ILoggingService>(TYPES.Logger);
export const Db = container.get<IDbService>(TYPES.Db);
export const Notification = container.get<INotificationService>(TYPES.Notification);
