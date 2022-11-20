import { getRandomNumber, drawHelper } from '../utils';
import { GAME_SIZE } from '../constants';

export default class Food {
  foodGraphic;

  constructor(container) {
    this.container = container;
  }

  _draw(cb) {
    const x = getRandomNumber(GAME_SIZE);
    const y = getRandomNumber(GAME_SIZE);
    if (cb(x, y)) {
      this._draw(cb);
      return;
    }
    this.foodGraphic = drawHelper(x, y, 0x008000);
    this.container.addChild(this.foodGraphic);
  }

  _remove() {
    this.container.removeChild(this.foodGraphic);
  }

  spawn(cb) {
    if (this.foodGraphic) {
      this._remove();
    }
    this._draw(cb);
  }
}
