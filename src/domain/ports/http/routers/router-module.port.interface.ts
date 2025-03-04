export interface IRouterModulePort<T> {
  initRoutes(): void;
  getRouter(): T;
}
