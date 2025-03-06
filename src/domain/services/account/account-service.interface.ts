import {
  IAccountCreate,
  IAccount,
} from '../../models/account/account-model.interface';

export interface IAccountService {
  findById(id: IAccount['id']): Promise<IAccount>;
  findByNumber(number: IAccount['number']): Promise<IAccount>;
  save(data: IAccountCreate): Promise<IAccount>;
}
