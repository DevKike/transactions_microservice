import {
  IAccountUpdate,
  IAccount,
} from '../../../domain/models/account/account.model.interface';
import { IAccountService } from '../../../domain/services/account/account.service.interface';
import { IUpdateAccountUseCase } from '../../../domain/use-cases/account/update-account-data.use.case.interface';

export class UpdateAccountUseCase implements IUpdateAccountUseCase {
  constructor(private readonly _accountService: IAccountService) {}

  async execute(id: IAccount['id'], data: IAccountUpdate): Promise<IAccount> {
    try {
      return await this._accountService.update(id, data);
    } catch (error) {
      throw error;
    }
  }
}
