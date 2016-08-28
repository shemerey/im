'use babel'

import { Client } from 'irc'
import {
  markMessageAsRecived,
  getMessage,
  sendMessage,
  setChannels,
  setActiveChannels,
  setUsers,
  setActiveUsers,
} from '../actions'

import { SimpleXMPP } from 'simple-xmpp'

/*
xmpp.on('online', function() {
	console.log('Yes, I\'m connected!');
	xmpp.join('general@conference.brug.xmpp.slack.com/anton');
});

xmpp.on('groupchat', function(conference, from, message, stamp) {
  console.log('%s says %s on %s', from, message, conference);
  // if(from != 'anton')
  // xmpp.send(conference, from +': echo: ' + message, true);
});

xmpp.on('error', function(err) {
	console.error(err);
});

xmpp.connect({
  jid: 'anton@brug.xmpp.slack.com',
  password: 'brug.9MDkvDbijblVjjaCEwev',
  host: 'brug.xmpp.slack.com',
  port: 5222,
});

// xmpp.subscribe('shemerey@brug.xmpp.slack.com');
// xmpp.subscribe('general@conference.brug.xmpp.slack.com');
//
// xmpp.send('shemerey@brug.xmpp.slack.com', 'test');
xmpp.send('general@conference.brug.xmpp.slack.com', 'test to general');
//
// xmpp.on('online', function(data) {
//     console.log('Connected with JID: ' + data.jid.user);
//     console.log('Yes, I\'m connected!');
// });
//
// xmpp.on('chat', function(from, message) {
//     xmpp.send(from, 'echo: ' + message);
// });
//
// xmpp.on('error', function(err) {
//     console.error(err);
// });
//
// xmpp.on('stanza', function(stanza) {
//     console.log(stanza);
// });
//
// xmpp.on('subscribe', function(from) {
//   xmpp.acceptSubscription(from);
// });
//
// xmpp.on('groupchat', function(conference, from, message, stamp) {
//     console.log('%s says %s on %s on %s at %s', from, message, conference, stamp.substr(0,9), stamp.substr(10));
// });
//
// // check for incoming subscription requests
// xmpp.getRoster();


id: 2,
name: 'BrUg',
type: 'XMPP',
icon: 'https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2016-08-25/72857911156_98fa7e5777a8f5c61014_88.jpg',
server: 'brug.xmpp.slack.com',
conference: 'conference.brug.xmpp.slack.com',
username: 'anton',
password: "brug.9MDkvDbijblVjjaCEwev",
jid: 'anton@brug.xmpp.slack.com',
port: 5222,
channels: ['general'],

*/

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



  perform() {
    const { id, store, client, host } = this

    client.on('stanza', (stanza) => {
      let rosterRequest = stanza.name == 'iq' && stanza.attrs.type == 'result' && stanza.attrs.id == 'roster_0'
      if(rosterRequest) {
        const users = stanza.children[0].children.map((u) => {
          return {
            id: u.attrs.jid,
            name: u.attrs.name
          }
        })

        store.dispatch(setUsers({teamId: this.id, users}))
        store.dispatch(setActiveUsers({teamId: this.id, users}))
      }
    });

    // Message Recived
    // client.addListener('message', (username, to, text) => {
    //   store.dispatch(getMessage({teamId: this.id, username, to, text}))
    // })

    // Chennel list recived
    // client.addListener('channellist', (channels) => {
      // FullFill all channels
      // store.dispatch(setChannels({teamId: this.id, channels}))

      // Fullfill joined
      // const activeNames = Object.keys(client.chans)
      // const activeChannels = channels.filter((ch) => {
      //   return activeNames.includes(ch.name)
      // })
      // store.dispatch(setActiveChannels({teamId: this.id, channels: activeChannels}))
    // })

    // Connected
    client.on('online', () => {
      console.log(`connected as ${this.jid}`)

      // join default channels
      this.channels.forEach((ch) => {
        client.join(`${this.username}@${this.conference}/${ch}`)
      })

      // Accept all subscribeers
      client.on('subscribe', (from) => {
        client.acceptSubscription(from)
      })

      // Ask for full list of channels
      client.getRoster();
    })
  }
}
