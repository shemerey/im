'use babel';

import _ from 'underscore-plus'

export default class MessageObject {
  constructor({ from, to, text }) {
    this.id = _.uniqueId()
    this.from = from
    this.to = to
    this.text = text
    this.createdAt = new Date()
    this.state = 'new'
  }

  serialize() {
    const { id, from, to, text, createdAt, state } = this

    return {
      id,
      from,
      to,
      text,
      createdAt,
      state,
    }
  }
}
