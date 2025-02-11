export default class GameRestartUtil {
  static instance;
  key = 'isRestart';
  #isRestart = 0;

  constructor() {
    if (GameRestartUtil.instance) {
      return GameRestartUtil.instance;
    }

    GameRestartUtil.instance = this;
  }

  getIsRestart() {
    const value = localStorage.getItem(this.key);
    this.#isRestart = value ? Number(value) : 0;
    return this.#isRestart;
  }

  setIsRestart() {
    localStorage.setItem(this.key, 1);
  }

  removeIsRestart() {
    localStorage.removeItem(this.key);
  }
}
