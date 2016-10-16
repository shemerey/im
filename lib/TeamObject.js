'use babel';

import { nowTs, uniqueId } from './utils'
import store from './store'
import TeamLoader from './TeamLoader'

export default class TeamObject {
  constructor({ id, userId, name, icon, status, accessToken }) {
    this.id = id || uniqueId()
    this.userId = userId
    this.name = name
    this.icon = icon
    this.status = status || 'new'
    this.accessToken = accessToken
  }

  send(message) {
    this.getConnection().send(message)
  }

  getConnection() {
    return (new TeamLoader()).find(this.id)
  }

  serialize() {
    const { id, userId, name, icon, status, accessToken } = this

    return {
      id,
      userId,
      name,
      icon,
      status,
      accessToken,
    }
  }
}
