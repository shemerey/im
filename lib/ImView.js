'use babel';

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { setVisiable } from './actions'

import App from '../components/App'

export default class ImView {
  constructor({ store, teamLoader, imChannelSelectView, serializedState: { imViewState } }) {
    this.imViewState = imViewState
    this.teamLoader = teamLoader

    // Create root element
    this.activated = false
    this.element = document.createElement('div')

    this.store = store
    this.imChannelSelectView = imChannelSelectView
    this.imChannelSelectView.getModal().onDidChangeVisible((visible) => {
      if (!visible) { this.focusMasterInput() }
    })

    this.topPanel = atom.workspace.addTopPanel({
      item: this.element,
      className: 'im-modal',
      visible: false,
    })

    this.topPanel.onDidChangeVisible((visible) => {
      if (visible) {
        this.hideAllPanels()
        this.focusMasterInput()
      } else {
        this.imChannelSelectView.hide()
        this.restoreAppPandels()
      }
    })
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  hideAllPanels() {
    atom.workspace.getBottomPanels().forEach((p) => { p.hide() })
    atom.workspace.getFooterPanels().forEach((p) => { p.hide() })
    atom.workspace.getLeftPanels().forEach((p) => { p.hide() })
  }

  restoreAppPandels() {
    atom.workspace.getFooterPanels().forEach((p) => { p.show() })
    atom.workspace.getLeftPanels().forEach((p) => { p.show() })
  }

  focusMasterInput() {
    let el; // FIXME: Find out a way to focus input in a better way
    if (el = this.element.querySelector('.im-editor')) { el.focus() }
  }

  isVisible() {
    return this.topPanel.isVisible()
  }

  hide() {
    this.topPanel.hide()
    this.store.dispatch(setVisiable(false))
  }

  show() {
    this.topPanel.show()
    this.store.dispatch(setVisiable(true))
    if (!this.activated) {
      setTimeout(() => {
        // load teams and show the IM
        this.teamLoader.perform()
      }, 1000)

      this.activated = true
    }
  }

  toggle() {
    if (this.isVisible()) {
      this.hide()
    } else {
      this.show()
    }
  }

  init() {
    // render app in a background
    setTimeout(() => {
      ReactDOM.render(
        <Provider store={this.store}>
          <IntlProvider locale="en">
            <App />
          </IntlProvider>
        </Provider>, this.element)
    }, 0)
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
