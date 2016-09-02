'use babel'


import { Client } from 'irc'
import {
  getMessage,
  sendMessage,
  setChannels,
  setActiveChannels,
} from '../actions'

export default class IrcProvider {
  constructor({ id, name, icon, store, options }) {
    // redux store instance
    this.store = store

    // provider details
    this.id = id
    this.name = name
    this.type = 'IRC'
    this.icon = icon

    // user details & server
    this.username = options.username
    this.host = options.host
    this.channels = options.channels

    const { host, username, password, channels } = options

    this.client = new Client(host, username, { channels, password, autoConnect: false })
    this.perform()
  }

  getClient() {
    return this.client
  }

  getId() {
    return this.id
  }

  send({ teamId, username, to, text }) {
    this.client.say(to.id, text)
    this.store.dispatch(sendMessage({ teamId, username, to, text }))
  }

  join(channel) {
    const { type, name, id } = channel
    if (type === 'group') {
      this.client.join(id)
    } else {
      console.log(channel)
    }
  }

  perform() {
    const { id, client, store } = this

    // Message Recived
    client.addListener('message', (username, channelId, text) => {
      const to = {
        id: channelId,
      }
      store.dispatch(getMessage({ teamId: id, username, to, text }))
    })

    // Chennel list recived
    client.addListener('channellist', (list) => {
      const channels = list.map((obj) => {
        return {
          id: obj.name,
          name: obj.name.replace(/^#/, ''),
          type: 'group',
        }
      })

      this.store.dispatch(setChannels({ teamId: this.id, channels }))
      this.store.dispatch(setActiveChannels({ teamId: this.id, channels }))

      // debugger
      // const channels = stanza.children[0].children.map((obj) => {
      //   return {
      //     id: obj.attrs.jid,
      //     name: obj.attrs.name,
      //     type: 'group',
      //   }
      // })

      // this.store.dispatch(setChannels({teamId: this.id, channels}))
      // this.store.dispatch(setActiveChannels({teamId: this.id, channels}))
      //
      // // FullFill all channels
      // store.dispatch(setChannels({ teamId: this.id, channels }))
      //
      // // Fullfill joined
      // const activeNames = Object.keys(client.chans)
      // const activeChannels = channels.filter((ch) => activeNames.includes(ch.name))
      // store.dispatch(setActiveChannels({ teamId: this.id, channels: activeChannels }))
    })

    // Connected
    client.addListener('registered', () => {
      // Ask for full list of channels
      client.send('LIST')
    })

    this.client.connect()
  }
}
