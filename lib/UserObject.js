'use babel';

import _ from 'underscore-plus'

export default class UserObject {
  constructor({ id, username, avatar, displayName, teamId, status, email }) {
    this.id = id || _.uniqueId()
    this.teamId = teamId
    this.username = username
    this.avatar = avatar || 'https://i2.wp.com/koding-cdn.s3.amazonaws.com/images/default.avatar.140.png?ssl=1'
    this.displayName = displayName
    this.email = email
    this.status = status || 'online' // required ['online', 'offline', 'inactive', ...]
  }

  serialize() {
    const { id, username, displayName, avatar } = this

    return {
      id,
      username,
      displayName,
      avatar,
    }
  }
}
