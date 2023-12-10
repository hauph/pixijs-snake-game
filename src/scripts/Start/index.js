import { Text } from 'pixi.js';
import GraphicInterface from '../GraphicInterface';
import { GAME_SIZE } from '../constants';

export default class Start extends GraphicInterface {
  #textGraphic;

  constructor(container) {
    super();
    this.container = container;
  }

  draw() {
    const text = new Text('Press "s" to start.', {
      fontSize: 50,
      fill: 0xff0000,
      align: 'center',
    });
    text.zIndex = 999;
    text.anchor.set(0.5);
    text.x = GAME_SIZE / 2;
    text.y = GAME_SIZE / 2;
    this.container.addChild(text);
    this.#textGraphic = text;
  }

  remove() {
    if (this.#textGraphic) {
      this.container.removeChild(this.#textGraphic);
      this.#textGraphic.destroy(); // Optional: destroy the textGraphic to free up resources
    }
  }
}
