import { Graphics } from 'pixi.js';
import { UNIT, GAME_SIZE } from './constants';
import Coordinate from './Coordinate';

export const getRandomNumber = (size) => {
  let randonNumber = Math.floor(Math.random() * size);
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

export const getRandomDefaultPosition = () => {
  const randonNumber = getRandomNumber(4);
  const x = getRandomNumber(GAME_SIZE - 60);
  const y = getRandomNumber(GAME_SIZE - 60);
  let defaultPosition = [];

  switch (randonNumber) {
    case 0: {
      // Up
      defaultPosition = [
        new Coordinate(x, y),
        new Coordinate(x, y + UNIT),
        new Coordinate(x, y + UNIT * 2),
      ];
      break;
    }
    case 1: {
      // Right
      defaultPosition = [
        new Coordinate(x, y),
        new Coordinate(x - UNIT, y),
        new Coordinate(x - UNIT * 2, y),
      ];
      break;
    }
    case 2: {
      // Bottom
      defaultPosition = [
        new Coordinate(x, y),
        new Coordinate(x, y - UNIT),
        new Coordinate(x, y - UNIT * 2),
      ];
      break;
    }
    default: {
      // Left
      defaultPosition = [
        new Coordinate(x, y),
        new Coordinate(x + UNIT, y),
        new Coordinate(x + UNIT * 2, y),
      ];
    }
  }

  return defaultPosition;
};
