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
      const cvc = this.generateCVC();
      const dueDate = this.generateDueDate();

      const newData = {
        ...data,
        cvc,
        dueDate,
      };

      return await this._accountService.save(newData);
    } catch (error) {
      throw error;
    }
  }

  private generateCVC(): number {
    return Math.floor(100 + Math.random() * 900);
  }

  private generateDueDate(): Date {
    const today = new Date();
    return new Date(today.setFullYear(today.getFullYear() + 3));
  }
}
