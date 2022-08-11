import 'Phaser';

export interface ISpriteConstructor {
  hash: string;
  name?: string;
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}
