import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ITransactionCreate } from '../../../../../domain/models/transaction/transaction.model.interface';

export class TransactionCreateReDto implements ITransactionCreate {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  destinationAccountId: number;
}
