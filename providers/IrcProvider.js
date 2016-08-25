'use babel'

import { Client } from 'irc'
import { say, getMessage } from '../actions'

/*
{
  id: 1,
  name: 'Irc',
  type: 'IrcProvider',
  icon: 'https://lh3.googleusercontent.com/ul6H_gVyLQ8for0vMtG-J6DoLE_IKMfI9iKcFGjZRnEJL1kE2W36YH-YupoM7TOZbObq=w200',
  server: 'chat.freenode.net',
  username: 'SheMereY',
  channels: ['#ruby', '#atom', '#ubuntu'],
}
*/

export default class IrcProvider {
  constructor(store, options) {
    const { id, server, username, sasl, nick, userName, password, channels, icon } = options
    this.store = store

    this.id = id
    this.type = 'IrcProvider'

    this.username = username
    this.channels = channels
    this.icon = icon

    this.client = new Client(server, username, { channels, sasl, nick, userName, password  })
    this.perform()
  }

  perform() {
    const { id, type, client, store } = this
    client.addListener('error', (message) => console.log('error: ', message))
    client.addListener('message', (username, channel, message) => {
      console.log(username + ' => ' + channel + ': ' + message)
      store.dispatch(getMessage({id, type, username, channel, message}))
    })
  }
}
