import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import {
  IDeposit,
  ITransaction,
} from '../../../domain/models/transaction/transaction.model.interface';
import { IAccountService } from '../../../domain/services/account/account.service.interface';
import { ITransactionService } from '../../../domain/services/transaction/transaction.service.interface';
import { IDepositMoneyUseCase } from '../../../domain/use-cases/transaction/deposit-money.use-case.interface';

export class DepositMoneyUseCase implements IDepositMoneyUseCase {
  constructor(
    private readonly _accountService: IAccountService,
    private readonly _transactionService: ITransactionService
  ) {}

  async execute(data: IDeposit): Promise<ITransaction> {
    try {
      const destinationAccount = await this._accountService.findByNumber(
        data.destinationAccount
      );

      if (!destinationAccount)
        throw new NotFoundException('Destination account not found');

      
      return await this._transactionService.save(data);
    } catch (error) {
      throw error;
    }
  }
}
