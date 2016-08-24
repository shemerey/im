'use babel'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'

import ImView from './im-view'
import store from './store'
import App from '../components/App'

import { CompositeDisposable } from 'atom'

import ProviderFactory from '../providers/ProviderFactory'

export default {

  imView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.imView = new ImView(state.imViewState)
    this.providerFactory = new ProviderFactory(store)
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.imView.getElement(),
      className: 'im-modal',
      visible: false
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:toggle': () => this.toggle()
    }))

    setTimeout(() => {
      this.providerFactory.perform()
      // render React App
      ReactDOM.render(
        <Provider store={store}>
          <IntlProvider locale="en">
            <App />
          </IntlProvider>
        </Provider>
        ,this.imView.getElement())
    }, 1000)
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
