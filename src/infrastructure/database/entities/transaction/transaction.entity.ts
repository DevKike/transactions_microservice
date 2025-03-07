import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  TransactionStatus,
  TransactionType,
} from '../../../../domain/enums/transaction/transaction.enum';
import { IAccount } from '../../../../domain/models/account/account.model.interface';
import { ITransaction } from '../../../../domain/models/transaction/transaction.model.interface';
import { Account } from '../account/account.entity';

@Entity('transaction')
export class Transaction implements ITransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.sourceTransactions, {
    nullable: true,
  })
  @JoinColumn({ name: 'source_account_id' })
  sourceAccount?: Account;

  @ManyToOne(() => Account, (account) => account.destinationTransactions)
  @JoinColumn({ name: 'destination_account_id' })
  destinationAccount: Account;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
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
