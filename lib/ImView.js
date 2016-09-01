'use babel';

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'

import App from '../components/App'

export default class ImView {
  constructor({ store, imChannelSelectView, serializedState: { imViewState } }) {
    this.imViewState = imViewState

    // Create root element
    this.element = document.createElement('div')

    this.store = store
    this.imChannelSelectView = imChannelSelectView
    this.imChannelSelectView.getModal().onDidChangeVisible((visible) => {
      if (!visible) { this.focusMasterInput() }
    })

    this.modalPanel = atom.workspace.addTopPanel({
      item: this.element,
      className: 'im-modal',
      visible: false,
    })

    this.modalPanel.onDidChangeVisible((visible) => {
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
    return this.modalPanel.isVisible()
  }

  toggle() {
    if (this.isVisible()) {
      this.modalPanel.hide()
    } else {
      this.modalPanel.show()
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
    }, 10)
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
