import {
  IDeposit,
  ITransaction,
} from '../../models/transaction/transaction.model.interface';

export interface IDepositMoneyUseCase {
  execute(data: IDeposit): Promise<ITransaction>;
}
