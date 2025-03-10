import {
  AccountStatus,
  AccountType,
} from '../../../domain/enums/account/account.enum';
import { BadRequestException } from '../../../domain/exceptions/bad-request.exception';
import {
  IAccount,
  IAccountCreate,
} from '../../../domain/models/account/account.model.interface';
import { IAccountService } from '../../../domain/services/account/account.service.interface';
import { ICreateAccountUseCase } from '../../../domain/use-cases/account/create-account.use-case.interface';
import { LOCAL_ENVIRONMENT } from '../../../infrastructure/environments/local.environment';
import { IHttpService } from '../../../infrastructure/services/logger/interfaces/http.service.interface';

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(
    private readonly _accountService: IAccountService,
    private readonly _httpService: IHttpService
  ) {}

  async execute(id: IAccount['userId']): Promise<IAccount> {
    try {
      const response = await this._httpService.post(
        `${LOCAL_ENVIRONMENT.USER_MICROSERVICE_URL}/validate`,
        id
      );

      if (!response.data.message)
        throw new BadRequestException('User is not valid');

      const accountNumber = this.generateAccountNumber();
      const cvc = this.generateCVC();
      const dueDate = this.generateDueDate();

      const newData = {
        userId: id,
        type: AccountType.CHECKING,
        balance: 0,
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

  private generateCVC(): string {
    return Math.floor(100 + Math.random() * 900).toString();
  }

  private generateDueDate(): Date {
    const today = new Date();
    return new Date(today.setFullYear(today.getFullYear() + 3));
  }
}
