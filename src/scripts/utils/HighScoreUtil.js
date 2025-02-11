export default class HighScoreUtil {
  static instance;
  key = 'highScore';
  #highScore = 0;

  constructor() {
    if (HighScoreUtil.instance) {
      return HighScoreUtil.instance;
    }

    HighScoreUtil.instance = this;
  }

  getHighScore() {
    const score = localStorage.getItem(this.key);
    this.#highScore = score ? Number(score) : 0;
    return this.#highScore;
  }

  setHighScore(score) {
    localStorage.setItem(this.key, score);
  }
}
