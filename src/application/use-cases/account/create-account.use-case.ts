import {
  IAccountCreate,
  IAccount,
} from '../../../domain/models/account/account.model.interface';
import { IAccountService } from '../../../domain/services/account/account.service.interface';
import { ICreateAccountUseCase } from '../../../domain/use-cases/account/create-account.use-case.interface';

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(private readonly _accountService: IAccountService) {}

  async execute(data: IAccountCreate): Promise<IAccount> {
    try {
      const account = await this._accountService.save(data);

      return account;
    } catch (error) {
      throw error;
    }
  }
}
