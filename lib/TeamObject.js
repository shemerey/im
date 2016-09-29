'use babel';

import _ from 'underscore-plus'

export default class TeamObject {
  constructor({ name, username, icon }) {
    this.id = _.uniqueId()
    this.name = name
    this.username = username
    this.iconUrl = icon
  }

  get icon() {
    return this.iconUrl || 'http://www.seaicons.com/wp-content/uploads/2015/10/chat-irc-icon.png'
  }

  serialize() {
    const { id, name, username, icon } = this

    return {
      id,
      name,
      username,
      icon,
    }
  }
}
