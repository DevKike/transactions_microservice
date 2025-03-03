export interface IServerPort {
  start(): Promise<void>;
  getHttpServer(): any;
}
