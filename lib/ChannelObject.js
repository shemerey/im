'use babel';

import _ from 'underscore-plus'

export default class ChannelObject {
  constructor({ name, type, topic }) {
    this.id = _.uniqueId()
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
