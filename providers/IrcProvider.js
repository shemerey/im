'use babel'

import { Client } from 'irc'
import { say, getMessage , sendMessage, setChannels, setActiveChannels} from '../actions'

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
    const { id, name, server, username, password, channels, icon } = options
    this.store = store

    this.id = id
    this.name = name
    this.type = 'IrcProvider'

    this.username = username
    this.channels = channels
    this.icon = icon

    this.client = new Client(server, username, { channels, password  })
    window.xxx = this.client
    this.perform()
  }

  getClient() {
    return this.client
  }

  getId(){
    return this.id
  }

  sendMessage({teamId, username, to, text}) {
    this.client.say(to, text)
    this.store.dispatch(sendMessage({teamId, username, to, text}))
  }

  perform() {
    const { id, client, store } = this

    // Message Recived
    client.addListener('message', (username, to, text) => {
      store.dispatch(getMessage({teamId: this.id, username, to, text}))
    })

    // Chennel list recived
    client.addListener('channellist', (channels) => {
      store.dispatch(setActiveChannels({teamId: this.id, channels}))
    })

    // Meessage send
    // client.addListener('selfMessage', function(to, text) {
    //   const username = store.getState().currentUser
    // });

    // Connected
    client.addListener('registered', () => {
      client.send('LIST')
    })
  }
}
