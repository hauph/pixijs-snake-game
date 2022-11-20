import Coordinate from './Coordinate';
import { getRandomNumber } from './utils';

export const GAME_SIZE = 800;

export const UNIT = 40;

export const DIRECTION = {
  ArrowUp: 'ArrowUp',
  ArrowRight: 'ArrowRight',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
};

const x = getRandomNumber(GAME_SIZE);
const y = getRandomNumber(GAME_SIZE);
export const DEFAULT_SNAKE = [new Coordinate(x, y)];

export const EDGE = {
  top: 0,
  right: 780,
  bottom: 780,
  left: 0,
};
