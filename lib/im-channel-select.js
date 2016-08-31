'use babel';

import { SelectListView } from 'atom-space-pen-views'
import { setCurrentChannel } from '../actions'

export default class ImChannelSelectView extends SelectListView {
  constructor(serializedState, store) {
    super(serializedState)
    this.store = store
  }

  getChannels() {
    const { currentTeam, channels } = this.store.getState()
    return channels[currentTeam].map((ch) => {
      return {
        ...ch,
        displayName: `${(ch.type === 'group') ? '#' : '@'}${ch.name}`
      }
    })
  }

  viewForItem(item) {
    return `<li>
              <span class="channel-type">
                ${(item.type === 'group') ? '#' : '@'}
              </span>
              <span class="channel-name">
                ${item.name}
              </span>
            </li>`
  }

  getFilterKey(){
    return 'displayName'
  }

  focus() {
    this.setItems(this.getChannels())
    this.focusFilterEditor()
  }

  setPanel(panel) {
    this.panel = panel
  }

  confirmed(item) {
    this.store.dispatch(setCurrentChannel(item))
    this.panel.hide()
  }

  cancelled() {
    this.panel.hide()
  }

  // Tear down any state and detach
  destroy() {
    this.remove()
  }

  getElement() {
    return this
  }
}
