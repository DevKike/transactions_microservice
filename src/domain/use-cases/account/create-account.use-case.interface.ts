import {
  IAccount,
  IAccountCreate,
} from '../../models/account/account.model.interface';

export interface ICreateAccountUseCase {
  execute(id: number): Promise<Omit<IAccount, 'cvc'>>;
}
