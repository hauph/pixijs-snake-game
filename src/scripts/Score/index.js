import { Text } from 'pixi.js';
import GraphicInterface from '../GraphicInterface';

export default class Score extends GraphicInterface {
  #textGraphic;

  constructor(container) {
    super();
    this.container = container;
    this.score = 0;
    this.text = `Score: ${this.score}`;
  }

  draw() {
    this.#textGraphic = new Text(this.text, {
      fill: 0xffffff,
    });
    this.#textGraphic.zIndex = 999;
    this.#textGraphic.x = 0;
    this.#textGraphic.y = 0;
    this.container.addChild(this.#textGraphic);
  }

  updateScore() {
    this.score += 1;
    this.#textGraphic.text = `Score${this.score > 1 ? 's' : ''}: ${this.score}`;
  }
}
