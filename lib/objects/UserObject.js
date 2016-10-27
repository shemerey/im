'use babel';

import { uniqueId } from '../utils'

export default class UserObject {
  constructor({ id, username, avatar, displayName, teamId, status, email }) {
    this.id = id || uniqueId()
    this.teamId = teamId
    this.username = username
    this.avatar = avatar || 'https://i2.wp.com/koding-cdn.s3.amazonaws.com/images/default.avatar.140.png?ssl=1'
    this.displayName = displayName
    this.email = email
    this.status = status
  }

  serialize() {
    const { id, teamId, username, avatar, displayName, email, status } = this

    return {
      id,
      teamId,
      username,
      avatar,
      displayName,
      email,
      status,
    }
  }
}
