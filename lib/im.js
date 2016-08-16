'use babel'

import React from 'react'
import ReactDOM from 'react-dom'

import ImView from './im-view'

class App extends React.Component {
  render() {
    return <h1>Hi there, I am an app</h1>
  }
}


import { CompositeDisposable } from 'atom'

export default {

  imView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.imView = new ImView(state.imViewState)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.imView.getElement(),
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:toggle': () => this.toggle()
    }))

    // render React App
    ReactDOM.render(<App />, this.imView.getElement())
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.imView.destroy()
  },

  serialize() {
    return {
      imViewState: this.imView.serialize()
    }
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    )
  }
}
