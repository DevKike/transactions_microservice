import {
  TransactionStatus,
  TransactionType,
} from '../../enums/transaction/transaction.enum';

export interface ITransaction {
  id: number;
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  reference: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
