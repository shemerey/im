'use babel';

import ImView from './im-view';
import { CompositeDisposable } from 'atom';

export default {

  imView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.imView = new ImView(state.imViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.imView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:toggle': () => this.toggle()
    }));

    // render React component
    // ReactDOM.render(SideRoot(store), this.side);
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.imView.destroy();
  },

  serialize() {
    return {
      imViewState: this.imView.serialize()
    };
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
