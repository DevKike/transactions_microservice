import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  TransactionStatus,
  TransactionType,
} from '../../../../domain/enums/transaction/transaction.enum';
import { IAccount } from '../../../../domain/models/account/account.model.interface';
import { ITransaction } from '../../../../domain/models/transaction/transaction.model.interface';

@Entity('transaction')
export class Transaction implements ITransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourceAccount: IAccount;

  @Column()
  destinationAccount: IAccount;

  @Column()
  amount: number;

  @Column()
  type: TransactionType;

  @Column({ enum: TransactionStatus, default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Column()
  reference: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
