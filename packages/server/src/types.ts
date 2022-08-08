import { Header, HexNumber, Transaction } from '@ckb-lumos/lumos';

export interface PoolTransactionEntry {
  transaction: Transaction;
  cycle: HexNumber;
  size: HexNumber;
  fee: HexNumber;
  timestamp: HexNumber;
}

export type TxStatus = undefined | 'pending' | 'proposed' | 'rejected' | 'committed';

export interface Response {
  transaction: Transaction;
  previousStatus: TxStatus;
  currentStatus: TxStatus;
}
