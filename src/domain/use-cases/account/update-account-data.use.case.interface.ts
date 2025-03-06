import {
  IAccount,
  IAccountUpdate,
} from '../../models/account/account-model.interface';

export interface IUpdateAccountUseCase {
  execute(id: IAccount['id'], data: IAccountUpdate): Promise<IAccount>;
}
