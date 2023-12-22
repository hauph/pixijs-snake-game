export default class AbstractGraphic {
  constructor() {
    if (new.target === AbstractGraphic) {
      throw new Error('Cannot instantiate AbstractGraphic directly.');
    }

    if (this.draw === undefined) {
      throw new Error(
        'Subclasses of AbstractGraphic must implement draw method.',
      );
    }
  }
}
