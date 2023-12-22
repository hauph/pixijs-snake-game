import { UNIT, GAME_SIZE } from '../constants';
import { drawHelper } from '../utils';
import AbstractGraphic from '../AbstractGraphic';

export default class Grid extends AbstractGraphic {
  constructor(app) {
    super();
    this.app = app;
  }

  draw() {
    const length = GAME_SIZE / UNIT;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        const cell = drawHelper(j * UNIT, i * UNIT, 0x000000, 1, 0x222222);
        this.app.stage.addChild(cell);
      }
    }
  }
}
