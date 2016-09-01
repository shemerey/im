'use babel';

export default class ImView {
  constructor({ serializedState: { imViewState } }) {
    // Create root element
    this.element = document.createElement('div')
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
