'use babel'

import ImView from './ImView'
import ImChannelSelectView from './ImChannelSelectView'
import StatusBarView from './StatusBarView'
import { CompositeDisposable } from 'atom'
import { setCurrentTeam } from './redux/modules/currentTeam'

import store from './redux/store'
import TeamLoader from './TeamLoader'

import ImAutocompleteProvider from './ImAutocompleteProvider'

store.getState()
window.TeamLoader = TeamLoader
window.store = store

export default {
  imView: null,
  imChannelSelectView: null,
  topPanel: null,
  subscriptions: null,

  activate(serializedState) {
    this.serializedState = serializedState
    this.store = store
    this.teamLoader = new TeamLoader(this)
    this.imChannelSelectView = new ImChannelSelectView(this)
    this.imView = new ImView(this)
    this.statusBarView = new StatusBarView(this)

    // setup autocomplete propvider
    this.autocompleteProvider = new ImAutocompleteProvider(this)

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'im:toggle': () => this.toggle(),
      'im:choose-channel': () => this.chooseChannel(),
      'im:focus-input': () => this.focusInput(),
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

    this.imView.init()
    this.statusBarView.init()
  },

  consumeStatusBar(statusBar) {
    this.statusBarTile = statusBar.addRightTile({
      item: this.statusBarView.getElement(),
      priority: -1000,
    })
  },

  getProviders() {
    return [this.autocompleteProvider]
  },

  deactivate() {
    if (this.topPanel) {
      this.topPanel.destroy()
    }

    this.subscriptions.dispose()
    this.imView.destroy()
  },

  serialize() {
    return {
      imViewState: this.imView.serialize(),
      ImChannelSelectViewState: this.imChannelSelectView.serialize(),
    }
  },

  changeTeam(index = 1) {
    if (this.isVisible()) {
      let nextTeam
      const { currentTeam, teams } = store.getState()

      // skip if no such team
      if (nextTeam = teams[index - 1]) {
        if (nextTeam.id !== currentTeam.id) {
          store.dispatch(setCurrentTeam(nextTeam))
          setTimeout(() => {
            this.imView.focusMasterInput()
          }, 0)
        }
      }
    }
  },

  focusInput() {
    if (this.isVisible()) {
      this.imView.focusMasterInput()
    }
  },

  isVisible() {
    return this.imView.isVisible()
  },

  chooseChannel() {
    this.imChannelSelectView.toggle()
  },

  toggle() {
    this.imView.toggle()
  },
}
