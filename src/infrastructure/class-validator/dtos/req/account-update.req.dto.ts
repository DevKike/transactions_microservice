import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import {
  AccountStatus,
  AccountType,
} from '../../../../domain/enums/account/account.enum';
import { IAccountUpdate } from '../../../../domain/models/account/account-model.interface';

export class AccountUpdateReqDto implements IAccountUpdate {
  @IsOptional()
  @IsEnum(AccountType)
  type?: AccountType;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  balance?: number;

  @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus;
}
