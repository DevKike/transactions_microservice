import {
  IAccountCreate,
  IAccount,
} from '../../models/account/account-model.interface';

export interface IAccountService {
  findById(id: IAccount['id']): Promise<IAccount | null>;
  findByNumber(number: IAccount['number']): Promise<IAccount | null>;
  save(data: IAccountCreate): Promise<IAccount>;
}
