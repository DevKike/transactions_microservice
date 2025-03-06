import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import {
  AccountStatus,
  AccountType,
} from '../../../../domain/enums/account/account.enum';
import { IAccountCreate } from '../../../../domain/models/account/account.model.interface';

export class AccountCreateReqDto implements IAccountCreate {
  @IsNotEmpty()
  @IsNumber()
  number: string;

  @IsNotEmpty()
  @IsEnum(AccountType)
  type?: AccountType;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsNotEmpty()
  @IsEnum(AccountStatus)
  status: AccountStatus;
}
