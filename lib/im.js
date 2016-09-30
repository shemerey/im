'use babel'

import ImView from './ImView'
import ImChannelSelectView from './ImChannelSelectView'
import { CompositeDisposable } from 'atom'
import { setCurrentTeam } from './actions'

import store from './store'
import TeamLoader from './TeamLoader'

store.getState()

export default {
  imView: null,
  imChannelSelectView: null,
  modalPanel: null,
  subscriptions: null,

  activate(serializedState) {
    this.serializedState = serializedState
    this.store = store
    this.teamLoader = new TeamLoader(this)
    this.imChannelSelectView = new ImChannelSelectView(this)
    this.imView = new ImView(this)

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

    this.imView.init()
  },

  consumeStatusBar(statusBar) {
    this.statusBarTile = statusBar
  },

  deactivate() {
    if (this.modalPanel) {
      this.modalPanel.destroy()
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
          // setTimeout(() => {
          //   this.imView.focusMasterInput()
          // }, 0)
        }
      }
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
