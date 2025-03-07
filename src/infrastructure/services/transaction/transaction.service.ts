import { inject, injectable } from 'inversify';
import { ITransactionService } from '../../../domain/services/transaction/transaction.service.interface';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from '../../database/entities/transaction/transaction.entity';
import { TYPES } from '../../inversify/types/inversify.types';
import {
  ICreateTransaction,
  ITransaction,
} from '../../../domain/models/transaction/transaction.model.interface';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';

@injectable()
export class TransactionService implements ITransactionService {
  private readonly _transactionRepository: Repository<Transaction>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource
  ) {
    this._transactionRepository = _dataSource.getRepository(Transaction);
  }

  async findById(id: ITransaction['id']): Promise<ITransaction> {
    try {
      const transaction = await this._transactionRepository.findOne({
        where: {
          id,
        },
      });

      if (!transaction || transaction === null) {
        throw new NotFoundException(`Transaction with id: ${id} not found`);
      }

      return transaction;
    } catch (error) {
      throw error;
    }
  }

  async findByAccount(
    account: ITransaction['destinationAccount']
  ): Promise<ITransaction[]> {
    try {
      const transactions = await this._transactionRepository.find({
        where: {
          destinationAccount: account,
        },
      });

      if (!transactions || transactions.length === 0) {
        throw new NotFoundException(
          `Transactions for account: ${account} not found`
        );
      }

      return transactions;
    } catch (error) {
      throw error;
    }
  }

  async save(data: ICreateTransaction): Promise<ITransaction> {
    try {
      return await this._transactionRepository.save(data);
    } catch (error) {
      throw error;
    }
  }
}
