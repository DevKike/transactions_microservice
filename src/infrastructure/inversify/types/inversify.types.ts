export const TYPES = {
  DataSource: Symbol.for('DataSource'),

  Application: Symbol.for('Application'),
  ExpressServerAdapter: Symbol.for('ExpressServerAdapter'),
  RouterManagerAdapter: Symbol.for('RouterManagerAdapter'),
  ResponseManagerAdapter: Symbol.for('ResponseManagerAdapter'),

  AccountService: Symbol.for('AccountService'),
  CreateAccountUseCase: Symbol.for('CreateAccountUseCase'),
  GetAccountDataUseCase: Symbol.for('GetAccountDataUseCase'),
  UpdateAccountUseCase: Symbol.for('UpdateAccountUseCase'),
  AccountRouterAdapter: Symbol.for('AccountRouterAdapter'),
};
