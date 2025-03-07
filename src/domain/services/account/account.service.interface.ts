import {
  IAccountCreate,
  IAccount,
  IAccountUpdate,
} from '../../models/account/account.model.interface';

export interface IAccountService {
  findById(id: IAccount['id']): Promise<IAccount>;
  findByNumber(number: IAccount['number']): Promise<IAccount | null>;
  save(data: IAccountCreate): Promise<IAccount>;
  update(id: IAccount['id'], data: IAccountUpdate): Promise<IAccount>;
}
