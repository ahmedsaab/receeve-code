import { injectable } from "inversify";

import { ILoggingService } from "./interfaces/logging-service";

@injectable()
export default class ConsoleLoggingService implements ILoggingService {
  info(message: string, data?: any): void {
    console.info(JSON.stringify({ message, data }))
  }

  error(message: string, error?: Error): void {
    console.info(JSON.stringify({
      message,
      error: error.message,
      stack: error.stack
    }))
  }
}
