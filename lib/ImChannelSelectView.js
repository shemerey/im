'use babel';

import { SelectListView } from 'atom-space-pen-views'
import _ from 'underscore-plus'
import { setActiveChannel } from './actions'
import store from './store'

export default class ImChannelSelectView extends SelectListView {
  constructor(im) {
    const { teamLoader, serializedState: { imViewState } } = im
    super(imViewState)
    this.store = store
    this.im = im
    this.teamLoader = teamLoader

    this.modal = atom.workspace.addModalPanel({
      item: this,
      className: 'im-modal-channel',
      visible: false,
    })

    this.modal.onDidChangeVisible((visible) => {
      if (visible) {
        this.setItems(this.getChannels())
        this.focusFilterEditor()
      }
    })
  }

  getChannels() {
    const { currentTeam, channels } = this.store.getState()
    return _.values(channels[currentTeam.id] || {}).map((ch) => {
      return {
        ...ch,
        teamId: currentTeam.id,
        displayName: `${(ch.type === 'group') ? '#' : '@'}${ch.name}`,
      }
    })
  }

  toggle() {
    // skip if not visiable
    if (!this.im.isVisible()) { return; }

    if (this.modal.isVisible()) {
      this.modal.hide()
    } else {
      this.modal.show()
    }
  }

  getModal() {
    return this.modal
  }

  viewForItem(item) {
    return `<li>
              <span class="channel-type">
                ${(item.type === 'group') ? '#' : '@'}
              </span>
              <span class="channel-name">${item.name}</span>
            </li>`
  }

  getFilterKey() {
    return 'displayName'
  }

  confirmed(channel) {
    this.store.dispatch(setActiveChannel(channel))
    this.modal.hide()
  }

  cancelled() {
    this.modal.hide()
  }

  hide() {
    this.modal.hide()
  }

  // Tear down any state and detach
  destroy() {
    this.remove()
  }

  getElement() {
    return this
  }
}
