'use babel';

import _ from 'underscore-plus'

export default class TeamObject {
  constructor({ id, name, icon }) {
    this.id = id || _.uniqueId()
    this.name = name
    this._iconUrl = icon
  }

  get icon() {
    return this._iconUrl || 'http://www.seaicons.com/wp-content/uploads/2015/10/chat-irc-icon.png'
  }

  serialize() {
    const { id, name, icon } = this

    return {
      id,
      name,
      icon,
    }
  }
}
