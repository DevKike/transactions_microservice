import {
  DepositMethod,
  TransactionStatus,
  TransactionType,
} from '../../enums/transaction/transaction.enum';
import { IAccount } from '../account/account.model.interface';

export interface ITransaction {
  id: number;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  reference: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  sourceAccount?: IAccount;
  destinationAccount: IAccount;
}

export interface ICreateTransaction
  extends Omit<ITransaction, 'id' | 'createdAt' | 'updatedAT'> {}

export interface IDeposit {
  destinationAccount: IAccount['number'];
  amount: number;
  description?: string;
  depositMethod: DepositMethod;
}
