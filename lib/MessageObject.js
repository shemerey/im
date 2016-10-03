'use babel';

import _ from 'underscore-plus'

export default class MessageObject {
  constructor({ id, senderId, channelId, text, createdAt, state }) {
    this.id = id || _.uniqueId()
    this.senderId = senderId
    this.channelId = channelId
    this.text = text
    this.createdAt = createdAt || new Date()
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
