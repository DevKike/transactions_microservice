import {
  ITransaction,
  ITransactionCreate,
} from '../../models/transaction/transaction.model.interface';

export interface ITransactionService {
  findById(id: ITransaction['id']): Promise<ITransaction>;
  findByAccount(
    account: ITransaction['destinationAccountId']
  ): Promise<ITransaction[]>;
  save(data: ITransactionCreate): Promise<ITransaction>;
}
