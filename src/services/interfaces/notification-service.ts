export interface INotificationService {
  publish<T>(message: T): Promise<void>;
}
