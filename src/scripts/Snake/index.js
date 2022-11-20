import { UNIT, DEFAULT_SNAKE, DIRECTION, EDGE } from '../constants';
import { drawHelper } from '../utils';

export default class Snake {
  constructor(container) {
    this.container = container;
    this.body = [];
    this.lastDir = DIRECTION.ArrowUp;
  }

  getHead() {
    return this.body[0];
  }

  _getTail() {
    return this.body.at(-1);
  }

  _drawHead() {
    const head = drawHelper(
      DEFAULT_SNAKE[0].x,
      DEFAULT_SNAKE[0].y,
      0xaa33bb,
      999,
    );
    this.container.addChild(head);
    this.body.push(head);
    return this;
  }

  _drawBody() {
    for (let i = 1; i < DEFAULT_SNAKE.length; i++) {
      const body = drawHelper(
        DEFAULT_SNAKE[i].x,
        DEFAULT_SNAKE[i].y,
        0xffffff,
        999,
      );
      this.container.addChild(body);
      this.body.push(body);
    }
  }

  draw() {
    this._drawHead()._drawBody();
  }

  move(direction) {
    const head = this.getHead();
    let prevPosition = {
      x: head.x,
      y: head.y,
    };
    // console.log(prevPosition);

    function moveHelper(body) {
      for (let i = 1; i < body.length; i++) {
        const temp = {
          x: body[i].x,
          y: body[i].y,
        };
        body[i].x = prevPosition.x;
        body[i].y = prevPosition.y;
        prevPosition = temp;
      }
    }

    switch (direction) {
      case DIRECTION.ArrowLeft: {
        if (this.lastDir === DIRECTION.ArrowRight && this.body.length > 1)
          break;
        this.body[0].x -= UNIT;
        moveHelper(this.body);
        this.lastDir = direction;
        break;
      }
      case DIRECTION.ArrowRight: {
        if (this.lastDir === DIRECTION.ArrowLeft && this.body.length > 1) break;
        this.body[0].x += UNIT;
        moveHelper(this.body);
        this.lastDir = direction;
        break;
      }
      case DIRECTION.ArrowUp: {
        if (this.lastDir === DIRECTION.ArrowDown && this.body.length > 1) break;
        this.body[0].y -= UNIT;
        moveHelper(this.body);
        this.lastDir = direction;
        break;
      }
      default: {
        if (this.lastDir === DIRECTION.ArrowUp && this.body.length > 1) break;
        this.body[0].y += UNIT;
        moveHelper(this.body);
        this.lastDir = direction;
        break;
      }
    }
  }

  eat() {
    const newTail = drawHelper(undefined, undefined, 0xffffff, 999);
    this.container.addChild(newTail);
    this.body.push(newTail);
  }

  isEdge() {
    const head = this.getHead();
    return (
      head.x === EDGE.left ||
      head.x === EDGE.right ||
      head.y === EDGE.top ||
      head.y === EDGE.bottom
    );
  }
}
