export default class HighScoreUtil {
  static instance;

  constructor() {
    if (HighScoreUtil.instance) {
      return HighScoreUtil.instance;
    }

    this.highScore = 0;
    HighScoreUtil.instance = this;
  }

  getHighScore() {
    const score = localStorage.getItem('highScore');
    this.highScore = score ? Number(score) : 0;
    return this.highScore;
  }

  setHighScore(score) {
    localStorage.setItem('highScore', score);
  }
}
