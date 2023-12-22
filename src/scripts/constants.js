import Coordinate from './Coordinate';
import { getRandomNumber } from './utils';

export const GAME_SIZE = 800;

export const UNIT = 40;

export const SPEED_UNIT = 5;

export const DIRECTION = {
  ArrowUp: 'ArrowUp',
  ArrowRight: 'ArrowRight',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
};

export const EDGE = {
  top: -UNIT,
  right: GAME_SIZE,
  bottom: GAME_SIZE,
  left: -UNIT,
};

const x = getRandomNumber(GAME_SIZE);
const y = getRandomNumber(GAME_SIZE);
export const DEFAULT_SNAKE = [new Coordinate(x, y <= 230 ? 400 : y)];
