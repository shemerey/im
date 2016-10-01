'use babel';

import _ from 'underscore-plus'

export default class ChannelObject {
  constructor({ id, teamId, name, type, topic, memberIds, isMember, unreadCount, lastRead }) {
    this.id = id || _.uniqueId()
    this.teamId = teamId
    this.name = name
    this.type = type
    this.topic = topic
    this.memberIds = memberIds || []
    this.isMember = isMember || false
    this.unreadCount = unreadCount || 0
    this.lastRead = lastRead || new Date()
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
