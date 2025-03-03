import {
  IAccountCreate,
  IAccount,
} from '../../models/account/account-model.interface';

export interface IAccountService {
  findById(id: IAccount['id']): Promise<IAccount | null>;
  create(data: IAccountCreate): Promise<IAccount>;
}
