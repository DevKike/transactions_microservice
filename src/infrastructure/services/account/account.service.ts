import { DataSource, Repository } from 'typeorm';
import { IAccountService } from '../../../domain/services/account/account-service.interface';
import { Account } from '../../database/entities/account.entity';
import { inject } from 'inversify';
import { TYPES } from '../../inversify/types/inversify.types';
import {
  IAccountCreate,
  IAccount,
} from '../../../domain/models/account/account-model.interface';

export class AccountService implements IAccountService {
  private _accountRepository: Repository<Account>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource
  ) {
    this._accountRepository = _dataSource.getRepository(Account);
  }

  async findById(id: IAccount['id']): Promise<IAccount | null> {
    try {
      const account = await this._accountRepository.findOne({
        where: {
          id,
        },
      });

      if (!account || account === null) {
        throw new Error('Account not found');
      }

      return account;
    } catch (error) {
      throw error;
    }
  }

  async create(data: IAccountCreate): Promise<IAccount> {
    try {
      return await this._accountRepository.save(data);
    } catch (error) {
      throw error;
    }
  }
}
