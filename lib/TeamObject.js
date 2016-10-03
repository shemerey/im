'use babel';

import _ from 'underscore-plus'

export default class TeamObject {
  constructor({ id, userId, name, icon, status }) {
    this.id = id || _.uniqueId()
    this.userId = userId
    this.name = name
    this.icon = icon || 'http://www.seaicons.com/wp-content/uploads/2015/10/chat-irc-icon.png'
    this.status = status || 'new'
  }

  serialize() {
    const { id, userId, name, icon, status } = this

    return {
      id,
      userId,
      name,
      icon,
      status,
    }
  }
}
