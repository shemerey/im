'use babel';

import { SelectListView } from 'atom-space-pen-views'
import { setCurrentChannel } from '../actions'
import ProviderFactory from '../providers/ProviderFactory'

export default class ImChannelSelectView extends SelectListView {
  constructor(im) {
    const { store, providerFactory, serializedState: { imViewState }} = im
    super(imViewState)
    this.im = im
    this.providerFactory = providerFactory
    this.store = store

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
    return channels[currentTeam].map((ch) => {
      return {
        ...ch,
        teamId: currentTeam,
        displayName: `${(ch.type === 'group') ? '#' : '@'}${ch.name}`
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

  currentTeamProvider() {
    const { currentTeam } = this.store.getState()
    return this.providerFactory.getAllTeams().find((client) => client.getId() === currentTeam)
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

  confirmed(item) {
    this.currentTeamProvider().join(item)
    this.store.dispatch(setCurrentChannel(item))
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
