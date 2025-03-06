import {
  ITransaction,
  ITransactionCreate,
} from '../../models/transaction/transaction.model.interface';

export interface ITransactionService {
  findById(id: ITransaction['id']): Promise<ITransaction>;
  findByAccount(
    account: ITransaction['destinationAccount']
  ): Promise<ITransaction[]>;
  save(data: ITransactionCreate): Promise<ITransaction>;
}
