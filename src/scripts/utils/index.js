import { Graphics } from 'pixi.js';
import { UNIT } from '../constants';
import HighScoreUtil from './HighScoreUtil';
import GameRestartUtil from './GameRestartUtil';

export const getRandomNumber = (size, isFreeNumber = false) => {
  let randonNumber = !isFreeNumber
    ? Math.floor(Math.random() * (640 - UNIT) + UNIT)
    : Math.floor(Math.random() * size);
  if (size > UNIT) {
    randonNumber -= randonNumber % UNIT;
  }
  return randonNumber;
};

export const drawHelper = (x, y, color, zIndex = 1, lineColor = 0x000000) => {
  const graphic = new Graphics();
  graphic
    .beginFill(color)
    .lineStyle(1, lineColor)
    .drawRect(0, 0, UNIT, UNIT)
    .endFill();
  graphic.position.x = x;
  graphic.position.y = y;
  graphic.zIndex = zIndex;
  return graphic;
};

export const highScore = new HighScoreUtil();
export const gameRestart = new GameRestartUtil();
