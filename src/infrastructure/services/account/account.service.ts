import { DataSource, Repository } from 'typeorm';
import { IAccountService } from '../../../domain/services/account/account-service.interface';
import { Account } from '../../database/entities/account.entity';
import { inject } from 'inversify';
import { TYPES } from '../../inversify/types/inversify.types';
import {
  IAccountCreate,
  IAccount,
} from '../../../domain/models/account/account-model.interface';
import { NotFoundException } from '../../../domain/exceptions/not-found.exception';
import { AlreadyExistsException } from '../../../domain/exceptions/already-exists.exception';

export class AccountService implements IAccountService {
  private _accountRepository: Repository<Account>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource
  ) {
    this._accountRepository = _dataSource.getRepository(Account);
  }

  async findById(id: IAccount['id']): Promise<IAccount> {
    try {
      const account = await this._accountRepository.findOne({
        where: {
          id,
        },
      });

      if (!account || account === null) {
        throw new NotFoundException(`Account with id: ${id} not found`);
      }

      return account;
    } catch (error) {
      throw error;
    }
  }

  async findByNumber(number: IAccount['number']): Promise<IAccount> {
    try {
      const account = await this._accountRepository.findOne({
        where: { number },
      });

      if (!account || account === null) {
        throw new NotFoundException(
          `Account with number number: ${number} not found`
        );
      }

      return account;
    } catch (error) {
      throw error;
    }
  }

  async save(data: IAccountCreate): Promise<IAccount> {
    try {
      const isExisting = await this.findByNumber(data.number);

      if (isExisting)
        throw new AlreadyExistsException(
          `Account with number: ${data.number} already exists`
        );

      return await this._accountRepository.save(data);
    } catch (error) {
      throw error;
    }
  }
}
