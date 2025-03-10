import { TransactionStatus, TransactionType } from '../../../../../domain/enums/transaction/transaction.enum';

export class SendMoneyResDto {
  reference: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description?: string;
  createdAt: Date;
}
