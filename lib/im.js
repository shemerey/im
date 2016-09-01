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

  activate(serializedState) {
    this.serializedState = serializedState
    this.store = store

    // load all teams
    this.providerFactory = new ProviderFactory(this)
    this.providerFactory.perform()

    this.imView = new ImView(this)
    this.ImChannelSelectView = new ImChannelSelectView(this)

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
        this.hideAllPanels()
        this.focusMasterInput()
      } else {
        this.restoreAppPandels()
      }
    })

    this.modalChannelSelectPanel.onDidChangeVisible((visible) => {
      if (!visible) {
        this.focusMasterInput()
      }
    })

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:toggle': () => this.toggle(),
      'im:choose-channel': () => this.chooseChannel(),
      'im:team-1': () => this.changeTeam(1),
      'im:team-2': () => this.changeTeam(2),
      'im:team-3': () => this.changeTeam(3),
      'im:team-4': () => this.changeTeam(4),
      'im:team-5': () => this.changeTeam(5),
      'im:team-6': () => this.changeTeam(6),
      'im:team-7': () => this.changeTeam(7),
      'im:team-8': () => this.changeTeam(8),
      'im:team-9': () => this.changeTeam(9),
    }))

    setTimeout(() => {
      // render React App
      ReactDOM.render(
        <Provider store={store}>
          <IntlProvider locale="en">
            <App />
          </IntlProvider>
        </Provider>,
        this.imView.getElement(),
        () => {
          visited = true
          this.hideAllPanels()
          this.focusMasterInput()
        }
      )
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

  focusMasterInput() {
    let el
    if (el = this.imView.element.querySelector('.im-editor')) {
      el.focus()
    }
  },

  changeTeam(teamId) {
    // skip if no such team
    if (store.getState().teams.find((t) => t.id === teamId)) {
      store.dispatch(setCurrentTeam(teamId))
      setTimeout(() => {
        this.focusMasterInput()
      }, 0)
    }
  },

  hideAllPanels() {
    atom.workspace.getBottomPanels().forEach((p) => { p.hide() })
    atom.workspace.getFooterPanels().forEach((p) => { p.hide() })
    atom.workspace.getLeftPanels().forEach((p) => { p.hide() })
  },

  restoreAppPandels() {
    atom.workspace.getFooterPanels().forEach((p) => { p.show() })
    atom.workspace.getLeftPanels().forEach((p) => { p.show() })
  },

  chooseChannel() {
    // skip if not visiable
    if (!this.modalPanel.isVisible()) { return; }

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
