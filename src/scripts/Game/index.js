import { Application, Container, Ticker } from 'pixi.js';
import Snake from '../Snake';
import Food from '../Food';
import Grid from '../Grid';
import Score from '../Score';
import Loss from '../Loss';
import Start from '../Start';
import HighScore from '../HighScore';
import { DIRECTION, GAME_SIZE, SPEED_UNIT } from '../constants';

export default class Game {
  static instance;

  #startGame = false;
  #gameOver = false;
  #shouldUpdateGameSpeed = true;
  #gameSpeed = 250;

  constructor() {
    if (Game.instance) {
      return Game.instance;
    }

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
    this.start = new Start(this.container);
    this.highScore = new HighScore(this.container);
    this.ticker = Ticker.shared;
    this.dir = DIRECTION.ArrowUp;

    Game.instance = this;
  }

  init() {
    document.body.appendChild(this.app.view);
    this.grid.draw();

    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);
    this.food.draw(this.#isFoodOnSnakeBody());
    this.score.draw();
    this.snake.draw();
    this.highScore.draw();

    this.#controller();

    if (!this.#startGame) {
      this.start.draw();
    }
  }

  #stopGame() {
    this.loss.draw();
    this.app.ticker.addOnce(() => {
      this.app.stop();
    });
    this.#startGame = false;
    this.#gameOver = true;
    this.highScore.setScore(this.score.getScore());
  }

  #initTicker() {
    this.ticker.maxFPS = 120;
    let lastTick = Date.now();
    this.ticker.add(() => {
      const currentTime = Date.now();
      if (currentTime - lastTick >= this.#gameSpeed) {
        this.#autoRun();
        lastTick = currentTime;
      }
    });
  }

  #autoRun() {
    if (this.dir.length > 1) {
      const res = this.snake.move(this.dir);
      if (res) {
        this.#stopGame();
      } else {
        this.#canEat();
        this.#increaseSpeed();
      }
    }
  }

  #canEat() {
    const head = this.snake.getHead();
    const { foodGraphic } = this.food;
    if (head.x === foodGraphic.x && head.y === foodGraphic.y) {
      this.snake.eat();
      this.food.spawn(this.#isFoodOnSnakeBody());
      this.score.setScore();
      this.highScore.setScore(this.score.getScore());
    }
  }

  #increaseSpeed() {
    const score = this.score.getScore();
    if (
      score >= SPEED_UNIT &&
      score % SPEED_UNIT === 0 &&
      this.#shouldUpdateGameSpeed &&
      this.#gameSpeed > 50
    ) {
      this.#gameSpeed -= 10;
      this.#shouldUpdateGameSpeed = false;
    } else if (
      score >= SPEED_UNIT &&
      score % SPEED_UNIT !== 0 &&
      !this.#shouldUpdateGameSpeed
    ) {
      this.#shouldUpdateGameSpeed = true;
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
      if (this.#startGame) {
        if (DIRECTION[key]) {
          this.dir = DIRECTION[key];
          const res = this.snake.move(this.dir);
          if (res) {
            this.#stopGame();
          } else {
            this.#canEat();
          }
        }
      } else {
        if (key === 's' && !this.#gameOver) {
          this.#startGame = true;
          this.start.remove();
          this.#initTicker();
        } else if (key === 'r' && this.#gameOver) {
          console.log('restart');
          window.location.reload();
        }
      }
    });
  }
}
