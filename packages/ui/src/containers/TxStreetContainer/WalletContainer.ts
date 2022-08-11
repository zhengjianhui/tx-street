import { createContainer } from 'unstated-next';

export interface WalletState {}

export const WalletContainer = createContainer<WalletState>(() => {
  return {};
});
