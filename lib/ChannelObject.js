'use babel';

import _ from 'underscore-plus'

export default class ChannelObject {
  constructor({ id, teamId, name, type, topic }) {
    this.id = id || _.uniqueId()
    this.teamId = teamId
    this.name = name
    this.type = type
    this.topic = topic
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
