export interface IRouterManagerPort<T> {
  manageRoutes(application: T): void;
}
