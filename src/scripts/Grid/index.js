import { UNIT } from '../constants';
import { drawHelper } from '../utils';
import GraphicInterface from '../GraphicInterface';

export default class Grid extends GraphicInterface {
  constructor(app) {
    super();
    this.app = app;
  }

  draw() {
    const length = UNIT * 2 + 4;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        const cell = drawHelper(j * UNIT, i * UNIT, 0x000000, 1, 0x222222);
        this.app.stage.addChild(cell);
      }
    }
  }
}
