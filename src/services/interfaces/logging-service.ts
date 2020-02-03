export interface ILoggingService {
  info(message: string, data?: any): void;
  error(message: string, error?: Error): void;
}
