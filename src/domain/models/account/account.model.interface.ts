import { AccountStatus, AccountType } from '../../enums/account/account.enum';
import { ITransaction } from '../transaction/transaction.model.interface';

export interface IAccount {
  id: number;
  number: string;
  type?: AccountType;
  balance: number;
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
  //   owner 1to1
}

export interface IAccountCreate
  extends Omit<IAccount, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IAccountUpdate
  extends Partial<
    Omit<IAccount, 'id' | 'number' | 'createdAt' | 'updatedAt'>
  > {}
