import { Application, Container, Ticker } from 'pixi.js';
import Snake from '../Snake';
import Food from '../Food';
import Grid from '../Grid';
import { DIRECTION, GAME_SIZE } from '../constants';

export default class Game {
  constructor() {
    this.app = new Application({
      width: GAME_SIZE,
      height: GAME_SIZE,
      antialias: true,
      background: '#000000',
    });
    this.grid = new Grid(this.app);
    this.container = new Container();
    this.snake = new Snake(this.container);
    this.food = new Food(this.container);
    this.ticker = Ticker.shared;
    this.dir = DIRECTION.ArrowUp;
  }

  init() {
    document.body.appendChild(this.app.view);
    this.grid.draw();

    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);
    this.snake.draw();
    this.food.spawn(this._isFoodOnSnakeBody());

    this._initTicker();
    this._controller();
  }

  _initTicker() {
    this.ticker.maxFPS = 120;
    let lastTick = Date.now();
    this.ticker.add(() => {
      const currentTime = Date.now();
      if (currentTime - lastTick >= 125) {
        this._autoRun();
        lastTick = currentTime;
      }
    });
    // this.ticker.stop();
  }

  _autoRun() {
    if (this.dir.length > 1) {
      this.snake.move(this.dir);
      this._canEat();
    }
  }

  _canEat() {
    const head = this.snake.getHead();
    const { foodGraphic } = this.food;
    if (head.x === foodGraphic.x && head.y === foodGraphic.y) {
      this.snake.eat();
      this.food.spawn(this._isFoodOnSnakeBody());
    }
  }

  _isFoodOnSnakeBody() {
    const _this = this;
    return (foodX, foodY) => {
      const snakeBody = _this.snake.body;
      for (let i = 0; i < snakeBody.length; i++) {
        const { x, y } = snakeBody[i];
        if (x === foodX && y === foodY) return true;
      }
      return false;
    };
  }

  _controller() {
    document.addEventListener('keydown', (e) => {
      const { key } = e;
      if (DIRECTION[key]) {
        this.dir = DIRECTION[key];
        this.snake.move(this.dir);
        this._canEat();
      }
      // else if (key === 'a') {
      //   this.ticker.start();
      // } else if (key === 's') {
      //   this.ticker.stop();
      // }
    });
  }
}
