import { AccountStatus, AccountType } from '../../enums/account/account.enum';

export interface IAccount {
  id: number;
  number: number;
  type: AccountType;
  balance: number;
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
  //   owner 1to1
}

export interface IAccountCreate
  extends Omit<IAccount, 'id' | 'createdAt' | 'updatedAt'> {}
