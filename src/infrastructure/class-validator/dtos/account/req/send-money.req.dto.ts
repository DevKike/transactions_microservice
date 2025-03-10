import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ITransfer } from '../../../../../domain/models/transaction/transaction.model.interface';

export class SendMoneyReqDto implements ITransfer {
  @IsNotEmpty()
  @IsNumber()
  sourceAccountNumber: number;

  @IsNotEmpty()
  @IsNumber()
  destinationAccountNumber: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;
}
