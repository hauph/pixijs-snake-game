export default class GraphicInterface {
  constructor() {
    if (this.draw === undefined) {
      throw new Error(
        'Subclasses of GraphicInterface must implement draw method.',
      );
    }
  }
}
