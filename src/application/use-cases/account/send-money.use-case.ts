import {
  TransactionStatus,
  TransactionType,
} from '../../../domain/enums/transaction/transaction.enum';
import { BadRequestException } from '../../../domain/exceptions/bad-request.exception';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import {
  ITransaction,
  ITransfer,
} from '../../../domain/models/transaction/transaction.model.interface';
import { IAccountService } from '../../../domain/services/account/account.service.interface';
import { ITransactionService } from '../../../domain/services/transaction/transaction.service.interface';
import { ISendMoneyUseCase } from '../../../domain/use-cases/account/send-money.use-case.interface';
import { SendMoneyReqDto } from '../../../infrastructure/class-validator/dtos/account/req/send-money.req.dto';
import { SendMoneyResDto } from '../../../infrastructure/class-validator/dtos/account/res/send-money.res.dto';

export class SendMoneyUseCase implements ISendMoneyUseCase<SendMoneyResDto> {
  constructor(
    private readonly _accountService: IAccountService,
    private readonly _transactionService: ITransactionService
  ) {}

  async execute(sendMoneyData: ITransfer): Promise<SendMoneyResDto> {
    try {
      const sourceAccount = await this._accountService.findByNumber(
        sendMoneyData.sourceAccountNumber
      );
      const destinationAccount = await this._accountService.findByNumber(
        sendMoneyData.destinationAccountNumber
      );

      if (!sourceAccount || !destinationAccount)
        throw new NotFoundException('Account not found');

      if (sourceAccount.balance < sendMoneyData.amount)
        throw new BadRequestException('Insufficient balance');

      const transaction = await this._transactionService.save({
        ...sendMoneyData,
        type: TransactionType.TRANSFER,
        status: TransactionStatus.COMPLETED,
        reference: this.generateReference(sendMoneyData.sourceAccountNumber),
        sourceAccountId: sourceAccount,
        destinationAccountId: destinationAccount,
      });

      await this._accountService.updateBalance(
        sourceAccount.number,
        -sendMoneyData.amount
      );
      await this._accountService.updateBalance(
        destinationAccount.number,
        sendMoneyData.amount
      );

      return {
        reference: transaction.reference,
        amount: transaction.amount,
        type: transaction.type,
        status: transaction.status,
        description: transaction.description,
        createdAt: transaction.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }

  private generateReference(accountNumber: number): string {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `TRF-${accountNumber}-${timestamp}-${random}`;
  }
}
