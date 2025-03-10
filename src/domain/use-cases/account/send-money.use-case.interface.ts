import {
  ITransfer,
} from '../../models/transaction/transaction.model.interface';

export interface ISendMoneyUseCase<T> {
  execute(sendMoneyData: ITransfer): Promise<T>;
}
