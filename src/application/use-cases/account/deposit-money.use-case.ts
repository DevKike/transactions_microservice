import { TransactionStatus, TransactionType } from '../../../domain/enums/transaction/transaction.enum';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import {
  IDeposit,
  ITransaction,
  ITransactionCreate,
} from '../../../domain/models/transaction/transaction.model.interface';
import { IAccountService } from '../../../domain/services/account/account.service.interface';
import { ITransactionService } from '../../../domain/services/transaction/transaction.service.interface';
import { IDepositMoneyUseCase } from '../../../domain/use-cases/account/deposit-money.use-case.interface';

export class DepositMoneyUseCase implements IDepositMoneyUseCase {
  constructor(
    private readonly _transactionService: ITransactionService,
    private readonly _accountService: IAccountService
  ) {}

  async execute(data: IDeposit): Promise<ITransaction> {
    const account = await this._accountService.findByNumber(
      data.destinationAccountNumber
    );

    if (!account)
      throw new NotFoundException(
        `Account with id: ${data.destinationAccountNumber} not found`
      );

    const newData: ITransactionCreate = {
      ...data,
      status: TransactionStatus.COMPLETED,
      type: TransactionType.DEPOSIT,
      reference: this.generateReference(data.destinationAccountNumber),
    };

    const transaction = await this._transactionService.save(newData);

    this._accountService.updateBalance(
      data.destinationAccountNumber,
      data.amount
    );

    return transaction;
  }

  private generateReference(destinationAccountNumber: number): string {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `DEP-${destinationAccountNumber}-${timestamp}-${random}`;
  }
}
