import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAccount } from '../../../../domain/models/account/account.model.interface';
import {
  AccountStatus,
  AccountType,
} from '../../../../domain/enums/account/account.enum';
import { Transaction } from '../transaction/transaction.entity';

@Entity('account')
export class Account implements IAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', unique: true })
  number: number;

  @Column({ type: 'varchar', width: 3 })
  cvc: string;

  @Column({ name: 'due_date', nullable: true })
  dueDate: Date;

  @Column({ type: 'enum', enum: AccountType, default: AccountType.CHECKING })
  type: AccountType;

  @Column({ type: 'float', default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.INACTIVE,
  })
  status: AccountStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.sourceAccountId)
  sourceTransactions: Transaction[];

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.destinationAccountId
  )
  destinationTransactions: Transaction[];
}
