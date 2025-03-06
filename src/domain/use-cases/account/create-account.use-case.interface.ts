import {
  IAccount,
  IAccountCreate,
} from '../../models/account/account-model.interface';

export interface ICreateAccountUseCase {
  execute(data: IAccountCreate): Promise<IAccount>;
}
