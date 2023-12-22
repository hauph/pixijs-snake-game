import { getRandomNumber, drawHelper } from '../utils';
import { GAME_SIZE } from '../constants';
import AbstractGraphic from '../AbstractGraphic';

export default class Food extends AbstractGraphic {
  foodGraphic;

  constructor(container) {
    super();
    this.container = container;
  }

  draw(cb) {
    const x = getRandomNumber(GAME_SIZE, true);
    const y = getRandomNumber(GAME_SIZE, true);
    if (cb(x, y)) {
      this.draw(cb);
      return;
    }
    this.foodGraphic = drawHelper(x, y, 0x008000);
    this.container.addChild(this.foodGraphic);
  }

  #remove() {
    this.container.removeChild(this.foodGraphic);
  }

  spawn(cb) {
    if (this.foodGraphic) {
      this.#remove();
    }
    this.draw(cb);
  }
}
