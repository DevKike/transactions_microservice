import { IsEnum, IsNotEmpty } from 'class-validator';
import { AccountType } from '../../../../../domain/enums/account/account.enum';
import { IAccountCreateDto } from '../../../../../domain/models/account/account.model.interface';

export class AccountCreateReqDto implements IAccountCreateDto {
  @IsNotEmpty()
  @IsEnum(AccountType)
  type: AccountType;
}
