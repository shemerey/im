'use babel';

import _ from 'underscore-plus'

export default class UserObject {
  constructor({ id, username, avatar, displayName, teamId, status, email }) {
    this.id = id || _.uniqueId()
    this.teamId = teamId
    this.username = username
    this.avatarUrl = avatar
    this.displayName = displayName
    this.email = email
    this.status = status || 'online' // required ['online', 'offline', 'inactive', ...]
  }

  get avatar() {
    return this.avatarUrl || 'https://i2.wp.com/koding-cdn.s3.amazonaws.com/images/default.avatar.140.png?ssl=1'
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
