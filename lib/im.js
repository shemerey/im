'use babel'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'

import ImView from './im-view'
import ImChannelSelectView from './im-channel-select'

import store from './store'
import App from '../components/App'

import { CompositeDisposable } from 'atom'
import { setCurrentTeam } from '../actions'

import ProviderFactory from '../providers/ProviderFactory'

export default {

  imView: null,
  ImChannelSelectView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.imView = new ImView(state.imViewState)
    this.ImChannelSelectView = new ImChannelSelectView(state.ImChannelSelectViewState, store)
    this.providerFactory = new ProviderFactory(store)

    this.modalPanel = atom.workspace.addTopPanel({
      item: this.imView.getElement(),
      className: 'im-modal',
      visible: false,
    })

    this.modalChannelSelectPanel = atom.workspace.addModalPanel({
      item: this.ImChannelSelectView.getElement(),
      className: 'im-modal-channel',
      visible: false,
    })

    this.ImChannelSelectView.setPanel(this.modalChannelSelectPanel)

    let visited = false
    this.modalPanel.onDidChangeVisible((visible) => {
      if (visible && visited) {
        atom.workspace.getBottomPanels().forEach((p) => { p.hide() })
        atom.workspace.getFooterPanels().forEach((p) => { p.hide() })
        atom.workspace.getLeftPanels().forEach((p) => { p.hide() })
        this.focus()
      } else {
        atom.workspace.getFooterPanels().forEach((p) => { p.show() })
        atom.workspace.getLeftPanels().forEach((p) => { p.show() })
      }
    })

    this.modalChannelSelectPanel.onDidChangeVisible((visible) => {
      if (!visible) {
        this.focus()
      }
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:toggle': () => this.toggle()
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:choose-channel': () => this.chooseChannel()
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:focus': () => this.focus()
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:team-1': () => this.changeTeam(1)
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:team-2': () => this.changeTeam(2)
    }))

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:team-3': () => this.changeTeam(3)
    }))

    setTimeout(() => {
      this.providerFactory.perform()
      // render React App
      ReactDOM.render(
        <Provider store={store}>
          <IntlProvider locale="en">
            <App />
          </IntlProvider>
        </Provider>,
        this.imView.getElement(), () => {
          visited = true
          atom.workspace.getBottomPanels().forEach((p) => { p.hide() })
          atom.workspace.getFooterPanels().forEach((p) => { p.hide() })
          atom.workspace.getLeftPanels().forEach((p) => { p.hide() })
          this.focus()
        })
    }, 10)
  },

  consumeStatusBar(statusBar) {
   this.statusBarTile = statusBar
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.imView.destroy()
  },

  serialize() {
    return {
      imViewState: this.imView.serialize(),
      ImChannelSelectViewState: this.ImChannelSelectView.serialize(),
    }
  },

  // FIXME: we have to keep focus on input all the time
  focus() {
    const el = this.imView.element.querySelector('.im-editor')
    if(el){
      el.focus()
    }
  },

  changeTeam(teamId) {
    if (store.getState().teams.find((t) => t.id === teamId)) {
      store.dispatch(setCurrentTeam(teamId))
      setTimeout(() => {
        this.focus()
      }, 0)
    }
  },

  chooseChannel() {
    if (!this.modalPanel.isVisible()) {
      return;
    }

    if (this.modalChannelSelectPanel.isVisible()) {
      this.modalChannelSelectPanel.hide()
    } else {
      this.modalChannelSelectPanel.show()
      this.ImChannelSelectView.focus()
    }
  },

  toggle() {
    if (this.modalPanel.isVisible()) {
      this.modalChannelSelectPanel.hide()
      this.modalPanel.hide()
    } else {
      this.modalPanel.show()
    }
  }
}
