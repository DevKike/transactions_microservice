import { IsNotEmpty, IsNumber } from 'class-validator';
import { IDeposit } from '../../../../domain/models/transaction/transaction.model.interface';

export class DepositMoneyReqDto implements IDeposit {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  destinationAccountNumber: number;
}
