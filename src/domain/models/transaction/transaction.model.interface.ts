import {
  TransactionStatus,
  TransactionType,
} from '../../enums/transaction/transaction.enum';
import { IAccount } from '../account/account.model.interface';

export interface ITransaction {
  id: number;
  sourceAccount: IAccount;
  destinationAccount: IAccount;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  reference: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionCreate
  extends Omit<ITransaction, 'id' | 'createdAt' | 'updatedAt'> {}
