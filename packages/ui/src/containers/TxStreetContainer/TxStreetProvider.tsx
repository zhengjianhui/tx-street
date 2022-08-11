import { useState } from 'react';
import Phaser from 'phaser';
import { createContainer } from 'unstated-next';

interface TxStreetState {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  playgroundGame?: Phaser.Game;
  setPlaygroundGame: (playgroundGame: Phaser.Game) => void;
}

export const TxStreetContainer = createContainer<TxStreetState>(() => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [playgroundGame, setPlaygroundGame] = useState<Phaser.Game>();

  const state: TxStreetState = {
    showSidebar,
    setShowSidebar,
    playgroundGame,
    setPlaygroundGame,
  };

  return state;
});
