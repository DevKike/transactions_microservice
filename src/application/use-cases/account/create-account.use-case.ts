import { AccountStatus } from '../../../domain/enums/account/account.enum';
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
      const accountNumber = this.generateAccountNumber();
      const cvc = this.generateCVC();
      const dueDate = this.generateDueDate();

      const newData = {
        ...data,
        number: accountNumber,
        status: AccountStatus.ACTIVE,
        cvc,
        dueDate,
      };

      return await this._accountService.save(newData);
    } catch (error) {
      throw error;
    }
  }

  private generateAccountNumber(): number {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
  }

  private generateCVC(): number {
    return Math.floor(100 + Math.random() * 900);
  }

  private generateDueDate(): Date {
    const today = new Date();
    return new Date(today.setFullYear(today.getFullYear() + 3));
  }
}
