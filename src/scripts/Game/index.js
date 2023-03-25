import { Application, Container, Ticker } from 'pixi.js';
import Snake from '../Snake';
import Food from '../Food';
import Grid from '../Grid';
import Score from '../Score';
import Loss from '../Loss';
import { DIRECTION, GAME_SIZE } from '../constants';

export default class Game {
  constructor() {
    this.app = new Application({
      width: GAME_SIZE,
      height: GAME_SIZE,
      antialias: true,
      background: '#000000',
    });
    // this is for debugging using PixiJS Devtools (https://chrome.google.com/webstore/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon)
    window.__PIXI_APP__ = this.app;

    this.grid = new Grid(this.app);
    this.container = new Container();
    this.snake = new Snake(this.container);
    this.food = new Food(this.container);
    this.score = new Score(this.container);
    this.loss = new Loss(this.container);
    this.ticker = Ticker.shared;
    this.dir = DIRECTION.ArrowUp;
  }

  init() {
    document.body.appendChild(this.app.view);
    this.grid.draw();

    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);
    this.food.draw(this.#isFoodOnSnakeBody());
    this.score.draw();
    this.snake.draw();

    this.#initTicker();
    this.#controller();
  }

  #stopGame() {
    this.loss.draw();
    this.app.ticker.addOnce(() => {
      this.app.stop();
    });
  }

  #initTicker() {
    this.ticker.maxFPS = 120;
    let lastTick = Date.now();
    this.ticker.add(() => {
      const currentTime = Date.now();
      if (currentTime - lastTick >= 250) {
        this.#autoRun();
        lastTick = currentTime;
      }
    });
    // this.ticker.stop();
  }

  #autoRun() {
    if (this.dir.length > 1) {
      const res = this.snake.move(this.dir);
      if (res) {
        this.#stopGame();
      } else {
        this.#canEat();
      }
    }
  }

  #canEat() {
    const head = this.snake.getHead();
    const { foodGraphic } = this.food;
    if (head.x === foodGraphic.x && head.y === foodGraphic.y) {
      this.snake.eat();
      this.food.spawn(this.#isFoodOnSnakeBody());
      this.score.updateScore();
    }
  }

  #isFoodOnSnakeBody() {
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

  #controller() {
    document.addEventListener('keydown', (e) => {
      const { key } = e;
      if (DIRECTION[key]) {
        this.dir = DIRECTION[key];
        const res = this.snake.move(this.dir);
        if (res) {
          this.#stopGame();
        } else {
          this.#canEat();
        }
      }
      // else if (key === 'a') {
      //   this.ticker.start();
      // } else if (key === 's') {
      //   this.ticker.stop();
      // }
    });
  }
}
