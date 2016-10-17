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
    this.state = state || 'new' // sent, seen
  }

  content() {
    return this.text.replace(/<(.*?)>/g, this.replacer)
  }

  replacer(match, content) {
    // parse channel mention
    if (content[0] === '#') {
      const [id, name] = content.split('|')
      return `<a className="channel" href="${id}">#${name || id.replace(/^#/, '')}</a>`
    }

    // parse channel mention
    if (content[0] === '@') {
      const [id, name] = content.split('|')
      return `<a className="user" href="${id}">@${name || id.replace(/^@/, '')}</a>`
    }

    // parse channel mention
    if (content.includes('http')) {
      const [url, name] = content.split('|')
      return `<a className="url" target="_blank" href="${url}">${name || url}</a>`
    }

    return match
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
