import { Text } from 'pixi.js';
import { highScore } from '../utils';
import GraphicInterface from '../GraphicInterface';

export default class HighScore extends GraphicInterface {
  #textGraphic;

  constructor(container) {
    super();
    this.container = container;
    this.score = highScore.getHighScore();
    this.text = `H.Score: ${this.score}`;
  }

  draw() {
    this.#textGraphic = new Text(this.text, {
      fill: 0xffffff,
    });
    this.#textGraphic.zIndex = 999;
    this.#textGraphic.x = 0;
    this.#textGraphic.y = 40;
    this.container.addChild(this.#textGraphic);
  }

  setScore(score) {
    highScore.setHighScore(score);
  }
}
