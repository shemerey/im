'use babel';

import { nowTs, uniqueId } from './utils'

export default class ChannelObject {
  constructor({ id, teamId, name, type, topic, memberIds, isMember, unreadCount, lastRead, status }) {
    this.id = id || uniqueId()
    this.teamId = teamId
    this.name = name
    this.type = type
    this.topic = topic
    this.memberIds = memberIds || []
    this.isMember = isMember || false
    this.unreadCount = unreadCount || 0
    this.lastRead = lastRead || nowTs()
    this.status = status
  }

  serialize() {
    const { id, name, type, topic } = this

    return {
      id,
      name,
      type,
      topic,
    }
  }
}
