import { IAccount } from '../../../domain/models/account/account-model.interface';
import { IAccountService } from '../../../domain/services/account/account-service.interface';
import { IGetAccountDataUseCase } from '../../../domain/use-cases/account/get-account-data.use-case.interface';

export class GetAccountDataUseCase implements IGetAccountDataUseCase {
  constructor(private readonly _accountService: IAccountService) {}

  async execute(id: IAccount['id']): Promise<IAccount> {
    try {
      return await this._accountService.findById(id);
    } catch (error) {
      throw error;
    }
  }
}
