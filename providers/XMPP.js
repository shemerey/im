'use babel'

import { Client } from 'irc'
import {
  markMessageAsRecived,
  getMessage,
  sendMessage,
  setChannels,
  setActiveChannels,
} from '../actions'

import { SimpleXMPP } from 'simple-xmpp'

export default class XMPP {

  constructor(store, options) {
    const {
      id,
      name,
      icon,
      server,
      conference,
      port,
      jid,
      username,
      password,
      channels,
    } = options

    // redux store instance
    this.store = store

    // provider details
    this.id = id
    this.name = name
    this.type = 'XMPP'
    this.icon = icon

    // user details & server
    this.username = username
    this.channels = channels
    this.conference = conference
    this.host = server

    this.jid = jid || `${username}@${server}`

    this.client = new SimpleXMPP()
    this.client.connect({
      jid: this.jid,
      password: password,
      host: this.host,
      port: (port || 5222),
    })

    this.perform()
  }

  getClient() {
    return this.client
  }

  getId(){
    return this.id
  }

  sendMessage({teamId, username, to, text}) {
    // this.client.say(to, text)
    // this.store.dispatch(sendMessage({teamId, username, to, text}))
  }


  fullFillUsers(stanza) {
    if(
      stanza.name == 'iq' &&
      stanza.attrs.type == 'result' &&
      stanza.attrs.id == 'roster_0'
    ) {
      const channels = stanza.children[0].children.map((obj) => {
        return {
          id: obj.attrs.jid,
          name: obj.attrs.name,
          type: 'personal',
        }
      })

      this.store.dispatch(setChannels({teamId: this.id, channels}))
      this.store.dispatch(setActiveChannels({teamId: this.id, channels}))
    }
  }

  fullFillChannels(stanza) {
    if(
      stanza.name == 'iq' &&
      stanza.attrs.type == 'result' &&
      stanza.attrs.id == 'get_muc_rooms'
    ) {
      const channels = stanza.children[0].children.map((obj) => {
        return {
          id: obj.attrs.jid,
          name: obj.attrs.name,
          type: 'group',
        }
      })

      this.store.dispatch(setChannels({teamId: this.id, channels}))
      this.store.dispatch(setActiveChannels({teamId: this.id, channels}))
    }
  }

  getRoomsList(data) {
    this.client.conn.send(
      new this.client.Element('iq', {
        from: `${this.username}@${this.host}/${data.jid.resource}`,
        to: `${this.conference}`,
        type: 'get',
        id: 'get_muc_rooms'
      }).c('query', { xmlns: 'http://jabber.org/protocol/disco#items'})
    )
  }

  perform() {
    const { id, store, client, host } = this

    client.on('stanza', (stanza) => {
      this.fullFillUsers(stanza)
      this.fullFillChannels(stanza)
    });

    // Connected
    client.on('online', (data) => {
      console.table(data)

      // join default channels
      this.channels.forEach((ch) => {
        client.join(`${ch}@${this.conference}`)
      })

      // Accept all subscribeers
      client.on('subscribe', (from) => {
        client.acceptSubscription(from)
      })

      // Ask for public rooms
      this.getRoomsList(data)
      // Ask for full list of channels
      client.getRoster();
    })
  }
}
