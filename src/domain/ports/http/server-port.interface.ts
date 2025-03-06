export interface IServerPort<T> {
  start(): Promise<void>;
  getHttpServer(): T;
}
