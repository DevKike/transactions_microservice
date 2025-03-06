import { IAccount } from '../../models/account/account-model.interface';

export interface IGetAccountDataUseCase {
  execute(id: IAccount['id']): Promise<IAccount>;
}
