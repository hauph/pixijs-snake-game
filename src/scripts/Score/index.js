import { Text } from 'pixi.js';
import AbstractGraphic from '../AbstractGraphic';

export default class Score extends AbstractGraphic {
  static instance;

  #textGraphic;

  constructor(container) {
    super();

    if (Score.instance) {
      return Score.instance;
    }

    this.container = container;
    this.score = 0;
    this.text = `Score: ${this.score}`;

    Score.instance = this;
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

  setScore() {
    this.score += 1;
    this.#textGraphic.text = `Score${this.score > 1 ? 's' : ''}: ${this.score}`;
  }

  getScore() {
    return this.score;
  }
}
