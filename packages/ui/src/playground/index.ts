import 'phaser';
import Phaser from 'phaser';
import { GameConfig } from './config';

export class Game extends Phaser.Game {}

export function startGame(): Phaser.Game {
  const txStreet = new Game(GameConfig);
  console.log(`game start ${txStreet}`);
  return txStreet;
}
