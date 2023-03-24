import { UNIT, DEFAULT_SNAKE, DIRECTION, EDGE } from '../constants';
import { drawHelper } from '../utils';

export default class Snake {
  constructor(container, stopGameMethod) {
    this.container = container;
    this.body = [];
    this.lastDir = DIRECTION.ArrowUp;
    this.stop = stopGameMethod;
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

    function shuffleBody(ctx) {
      for (let i = 1; i < ctx.body.length; i++) {
        const temp = {
          x: ctx.body[i].x,
          y: ctx.body[i].y,
        };
        ctx.body[i].x = prevPosition.x;
        ctx.body[i].y = prevPosition.y;
        prevPosition = temp;
      }
    }

    function moveHelper(ctx) {
      shuffleBody(ctx);
      if (ctx.wrongMove()) ctx.stop();
      ctx.lastDir = direction;
    }

    switch (direction) {
      case DIRECTION.ArrowLeft: {
        // Snake cannot move backwards
        if (this.lastDir === DIRECTION.ArrowRight && this.body.length > 1)
          this.stop();

        this.body[0].x -= UNIT;
        moveHelper(this);
        break;
      }
      case DIRECTION.ArrowRight: {
        // Snake cannot move backwards
        if (this.lastDir === DIRECTION.ArrowLeft && this.body.length > 1)
          this.stop();

        this.body[0].x += UNIT;
        moveHelper(this);
        break;
      }
      case DIRECTION.ArrowUp: {
        // Snake cannot move backwards
        if (this.lastDir === DIRECTION.ArrowDown && this.body.length > 1)
          this.stop();

        this.body[0].y -= UNIT;
        moveHelper(this);
        break;
      }
      default: {
        // Snake cannot move backwards
        if (this.lastDir === DIRECTION.ArrowUp && this.body.length > 1)
          this.stop();

        this.body[0].y += UNIT;
        moveHelper(this);
        break;
      }
    }
    return false;
  }

  eat() {
    const newTail = drawHelper(undefined, undefined, 0xffffff, 999);
    this.container.addChild(newTail);
    this.body.push(newTail);
  }

  _hitEdge() {
    const head = this.getHead();
    return (
      head.x === EDGE.left ||
      head.x === EDGE.right ||
      head.y === EDGE.top ||
      head.y === EDGE.bottom
    );
  }

  _hitBody() {
    const head = this.getHead();
    return this.body.some(
      (coor, index) => index > 0 && coor.x === head.x && coor.y === head.y,
    );
  }

  wrongMove() {
    return this._hitEdge() || this._hitBody();
  }
}
