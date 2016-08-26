'use babel'

import { Client } from 'irc'
import { say, getMessage , setChannels, setActiveChannels} from '../actions'

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

    // store.dispatch(setChannels(chanels.map((channelName) => { name: channelName })))

    this.client = new Client(server, username, { channels, password  })
    this.perform()
    // window.xxx = this.client
  }

  perform() {
    const { id, client, store } = this

    // Message Recived
    client.addListener('message', (username, to, text) => {
      store.dispatch(getMessage({teamId: this.id, username, to, text}))
    })

    // Chennel list recived
    client.addListener('channellist', (channels) => {
      const { currentChannel } = store.getState()
      store.dispatch(setActiveChannels({teamId: this.id, channels, currentChannel}))
    })

    // Connected
    client.addListener('registered', () => {
      console.log(client.chans);
      client.chans
      client.send('LIST')
    })
  }
}
