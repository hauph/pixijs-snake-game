import { Text } from 'pixi.js';
import { highScore } from '../utils';
import AbstractGraphic from '../AbstractGraphic';

export default class HighScore extends AbstractGraphic {
  static instance;

  #textGraphic;

  constructor(container) {
    super();

    if (HighScore.instance) {
      return HighScore.instance;
    }

    this.container = container;
    this.score = highScore.getHighScore();
    this.text = `H.Score${this.score > 1 ? 's' : ''}: ${this.score}`;

    HighScore.instance = this;
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
    const currentScore = highScore.getHighScore();
    if (score > currentScore) {
      highScore.setHighScore(score);
    }
  }
}
