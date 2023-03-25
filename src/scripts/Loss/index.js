import { Text } from 'pixi.js';
import GraphicInterface from '../GraphicInterface';
import { GAME_SIZE } from '../constants';

export default class Loss extends GraphicInterface {
  textGraphic;

  constructor(container) {
    super();
    this.container = container;
  }

  draw() {
    const text = new Text('You Lose!', {
      fontSize: 100,
      fill: 0xff0000,
      align: 'center',
    });
    text.zIndex = 999;
    text.anchor.set(0.5);
    text.x = GAME_SIZE / 2;
    text.y = GAME_SIZE / 2;
    this.container.addChild(text);
  }
}
