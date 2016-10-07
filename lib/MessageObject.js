'use babel';

import { nowTs, uniqueId } from './utils'

export default class MessageObject {
  constructor({ id, senderId, channelId, text, createdAt, state }) {
    this.id = id || uniqueId()
    this.senderId = senderId
    this.channelId = channelId
    this.text = text
    this.createdAt = createdAt || nowTs()
    this.state = state || 'new'
  }

  serialize() {
    const { id, senderId, channelId, text, state } = this

    return {
      id,
      senderId,
      channelId,
      text,
      state,
    }
  }
}
