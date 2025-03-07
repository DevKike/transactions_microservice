export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REVERSED = 'reversed',
}

export enum DepositMethod {
  CASH = 'cash',
  CHECK = 'check',
  EXTERNAL_TRANSFER = 'external_transfer',
}
