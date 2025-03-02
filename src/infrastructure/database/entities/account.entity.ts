import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IAccount } from '../../../domain/models/account/account.model.interface';
import {
  AccountStatus,
  AccountType,
} from '../../../domain/enums/account/account.enum';

@Entity('account')
export class Account implements IAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

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
}
