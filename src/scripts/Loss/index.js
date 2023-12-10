import { Text } from 'pixi.js';
import GraphicInterface from '../GraphicInterface';
import { GAME_SIZE } from '../constants';

const texts = [
  {
    value: 'You Lose!',
    fontSize: 100,
    fill: 0xff0000,
  },
  {
    value: 'Press "r" to restart.',
    fontSize: 50,
    fill: 0xffffff,
  },
];

export default class Loss extends GraphicInterface {
  constructor(container) {
    super();
    this.container = container;
  }

  draw() {
    for (let i = 0; i < texts.length; i++) {
      const text = new Text(texts[i].value, {
        fontSize: texts[i].fontSize,
        fill: texts[i].fill,
        align: 'center',
      });
      text.zIndex = 999;
      text.anchor.set(0.5);
      text.x = GAME_SIZE / 2;
      text.y = GAME_SIZE / 2;
      if (i === 0) {
        text.y -= text.height / 2;
      } else {
        text.y += text.height / 2;
      }
      this.container.addChild(text);
    }
  }
}
