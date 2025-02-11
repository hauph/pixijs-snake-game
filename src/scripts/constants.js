import Coordinate from './Coordinate';
import { getRandomNumber } from './utils';

export const GAME_SIZE = 800;

export const UNIT = 40;

export const SPEED_UNIT = 5;

export const DIRECTION_MAPPER = {
  ArrowUp: 0,
  ArrowRight: 1,
  ArrowDown: 2,
  ArrowLeft: 3,
};

export const DIRECTION = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

export const EDGE = {
  top: -UNIT,
  right: GAME_SIZE,
  bottom: GAME_SIZE,
  left: -UNIT,
};

const x = getRandomNumber(520);
const y = getRandomNumber(520);
export const DEFAULT_SNAKE = [
  new Coordinate(x < 200 ? 200 : x, y < 200 ? 200 : y),
];
