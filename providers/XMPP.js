'use babel'

import {
  markMessageAsRecived,
  getMessage,
  sendMessage,
  setChannels,
  setActiveChannels,
} from '../actions'

import { SimpleXMPP } from 'simple-xmpp'

export default class XMPP {
  constructor({ id, name, icon, store, options }) {
    // redux store instance
    this.store = store

    // provider details
    this.id = id
    this.name = name
    this.type = 'XMPP'
    this.icon = icon

    // user details & server
    this.username = options.username
    this.password = options.password
    this.channels = options.channels
    this.conference = options.conference
    this.host = options.host
    this.jid = options.jid || `${options.username}@${options.host}`

    this.client = new SimpleXMPP()
    this.perform()
  }

  connect() {
    this.client.connect({
      jid: this.jid,
      password: this.password,
      host: this.host,
      port: 5222,
    })
  }

  getClient() {
    return this.client
  }

  getId(){
    return this.id
  }

  join(channel) {
    const { type, name, id } = channel
    if (type === 'group') {
      this.client.join(`${id}/${this.username}`)
    } else {
      this.client.join(`${id}`)
    }
  }

  send({teamId, username, to, text}) {
    this.client.send(to.id, text, to.type === 'group');
    if(to.type != 'group') {
      this.store.dispatch(
        sendMessage({
          teamId: this.id,
          to,
          username,
          text
        })
      )
    }
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

  // fullFillChannelHistory(stanza) {
  //   if(
  //     stanza.name == 'message'
  //   ) {
  //     console.table(stanza)
  //   }
  // }

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

    // group chat
    client.on('groupchat', (channelId, username, text, stamp) => {
      const to = {
        id: channelId,
        type: 'group',
      }
      this.store.dispatch(
        getMessage({
          teamId: this.id,
          to,
          username,
          text
        })
      )
    })

    // private chat
    client.on('chat', (personId, text) => {
      const to = {
        id: personId,
        type: 'personal',
      }
      this.store.dispatch(
        getMessage({
          teamId: this.id,
          to,
          username: personId.split('@')[0],
          text
        })
      )
    })

    // Connected
    client.on('online', (data) => {
      // join default channels
      this.channels.forEach((ch) => {
        client.join(`${ch}@${this.conference}/${this.username}`)
        // client.setPresence('chat', 'Out to lunch')


        // <presence
        //   from='hag66@shakespeare.lit/pda'
        //   id='n13mt3l'
        //   to='coven@chat.shakespeare.lit/thirdwitch'>
        //   <x xmlns='http://jabber.org/protocol/muc'>
        //     <history maxstanzas='20'/>
        //   </x>
        // </presence>

        this.client.conn.send(
          new this.client.Element('presence', {
            from: `${this.username}@${this.host}/${data.jid.resource}`,
            to: `${ch}@${this.conference}/${this.username}`,
            type: 'get',
            id: 'get_muc_room_history',
          }).c('x', { xmlns: 'hhttp://jabber.org/protocol/muc' }).c('history', { maxstanzas: '250' })
        )
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

    this.connect()
  }
}
