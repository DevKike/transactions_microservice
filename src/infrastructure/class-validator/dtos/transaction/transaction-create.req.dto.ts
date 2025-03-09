import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ICreateTransaction } from '../../../../domain/models/transaction/transaction.model.interface';

export class TransactionCreateReDto implements ICreateTransaction {
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
