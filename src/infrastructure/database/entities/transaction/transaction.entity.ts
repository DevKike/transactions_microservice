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
import { ITransaction } from '../../../../domain/models/transaction/transaction.model.interface';
import { Account } from '../account/account.entity';

@Entity('transaction')
export class Transaction implements ITransaction {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Account, (account) => account.sourceTransactions)
  @JoinColumn({ name: 'source_account_id' })
  sourceAccountId: Account;

  @ManyToOne(() => Account, (account) => account.destinationTransactions)
  @JoinColumn({ name: 'destination_account_id' })
  destinationAccountId: Account;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
