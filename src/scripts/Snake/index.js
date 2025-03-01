import { UNIT, DEFAULT_SNAKE, DIRECTION, EDGE } from '../constants';
import { drawHelper } from '../utils';
import AbstractGraphic from '../AbstractGraphic';

export default class Snake extends AbstractGraphic {
  static instance;

  constructor(container) {
    super();

    if (Snake.instance) {
      return Snake.instance;
    }

    this.container = container;
    this.body = [];
    this.lastDir = DIRECTION[0];

    Snake.instance = this;
  }

  getHead() {
    return this.body[0];
  }

  #drawHead() {
    const head = drawHelper(
      DEFAULT_SNAKE[0].x,
      DEFAULT_SNAKE[0].y,
      0xaa33bb,
      99,
    );
    this.container.addChild(head);
    this.body.push(head);
    return this;
  }

  #drawBody() {
    for (let i = 1; i < DEFAULT_SNAKE.length; i++) {
      const body = drawHelper(
        DEFAULT_SNAKE[i].x,
        DEFAULT_SNAKE[i].y,
        0xf2dc23,
        99,
      );
      this.container.addChild(body);
      this.body.push(body);
    }
  }

  draw() {
    this.#drawHead().#drawBody();
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
      if (ctx.#wrongMove()) return true;
      ctx.lastDir = direction;
      return false;
    }

    const [ArrowUp, ArrowRight, ArrowDown, ArrowLeft] = DIRECTION;

    switch (direction) {
      case ArrowLeft: {
        // Snake cannot move backwards
        if (this.lastDir === ArrowRight && this.body.length > 1) return true;

        this.body[0].x -= UNIT;
        break;
      }
      case ArrowRight: {
        // Snake cannot move backwards
        if (this.lastDir === ArrowLeft && this.body.length > 1) return true;

        this.body[0].x += UNIT;
        break;
      }
      case ArrowUp: {
        // Snake cannot move backwards
        if (this.lastDir === ArrowDown && this.body.length > 1) return true;

        this.body[0].y -= UNIT;
        break;
      }
      default: {
        // Snake cannot move backwards
        if (this.lastDir === ArrowUp && this.body.length > 1) return true;

        this.body[0].y += UNIT;
        break;
      }
    }

    return moveHelper(this);
  }

  eat() {
    const newTail = drawHelper(undefined, undefined, 0xf2dc23, 99);
    this.container.addChild(newTail);
    this.body.push(newTail);
  }

  #hitEdge() {
    const head = this.getHead();
    return (
      head.x === EDGE.left ||
      head.x === EDGE.right ||
      head.y === EDGE.top ||
      head.y === EDGE.bottom
    );
  }

  #hitBody() {
    const head = this.getHead();
    return this.body.some(
      (coor, index) => index > 0 && coor.x === head.x && coor.y === head.y,
    );
  }

  #wrongMove() {
    return this.#hitEdge() || this.#hitBody();
  }
}
