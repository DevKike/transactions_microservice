import { AccountStatus, AccountType } from '../../enums/account/account.enum';
import { ITransaction } from '../transaction/transaction.model.interface';

export interface IAccount {
  id: number;
  number: number;
  cvc: string;
  dueDate: Date;
  type?: AccountType;
  userId: number;
  balance: number;
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
  sourceTransactions: ITransaction[];
  destinationTransactions: ITransaction[];
}

export interface IAccountCreate
  extends Omit<
    IAccount,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'sourceTransactions'
    | 'destinationTransactions'
  > {}

export interface IAccountCreateDto {
  userId: number;
}

export interface IAccountUpdate
  extends Partial<
    Omit<
      IAccount,
      'id' | 'number' | 'createdAt' | 'updatedAt' | 'cvc' | 'dueDate'
    >
  > {}
