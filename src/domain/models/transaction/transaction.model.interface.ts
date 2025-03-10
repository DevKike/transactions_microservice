import {
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
  sourceAccountId: IAccount;
  destinationAccountId: IAccount;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionCreate
  extends Pick<
    ITransaction,
    'amount' | 'description' | 'type' | 'reference' | 'status'
  > {
  sourceAccountId?: IAccount;
  destinationAccountId?: IAccount;
}

export interface ITransactionResponse {
  type: TransactionType;
  status: TransactionStatus;
  reference?: string;
  amount?: number;
  description?: string;
  createdAt: Date;
}

export interface ITransactionWithoutCvc extends Omit<ITransaction, 'cvc'> {}

export interface ITransactionUpdate extends Pick<ITransaction, 'status'> {}

export interface IDeposit extends Pick<ITransaction, 'amount'> {
  destinationAccountNumber: IAccount['number'];
}

export interface ITransfer
  extends Pick<ITransaction, 'amount' | 'description'> {
  destinationAccountNumber: IAccount['number'];
  sourceAccountNumber: IAccount['number'];
}
