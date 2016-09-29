'use babel';

import _ from 'underscore-plus'

export default class UserObject {
  constructor({ username, avatar }) {
    this.id = _.uniqueId()
    this.username = username
    this.avatarUrl = avatar
    this.displayName = 'Anton Shemerey'
    this.status = 'online' // required ['online', 'offline', 'inactive', ...]
  }

  get avatar() {
    return this.avatarUrl || 'https://i2.wp.com/koding-cdn.s3.amazonaws.com/images/default.avatar.140.png?ssl=1'
  }

  serialize() {
    const { id, username, avatar } = this

    return {
      id,
      username,
      avatar,
    }
  }
}
