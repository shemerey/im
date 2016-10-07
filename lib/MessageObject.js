'use babel';

import { nowTs, uniqueId } from './utils'

export default class MessageObject {
  constructor({ id, teamId, senderId, channelId, text, createdAt, state }) {
    this.id = id || uniqueId()
    this.teamId = teamId
    this.senderId = senderId
    this.channelId = channelId
    this.text = text
    this.createdAt = createdAt || nowTs()
    this.state = state || 'new'
  }

  serialize() {
    const { id, teamId, senderId, channelId, text, state } = this

    return {
      id,
      teamId,
      senderId,
      channelId,
      text,
      state,
    }
  }
}
