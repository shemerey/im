'use babel'

import { Client } from 'irc'
import {
  markMessageAsRecived,
  getMessage,
  sendMessage,
  setChannels,
  setActiveChannels
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

*/

export default class XMPP {

  constructor(store, options) {
    const { id, name, server, username, password, channels, icon } = options
    this.store = store

    this.id = id
    this.name = name
    this.type = 'XMPP'

    this.username = username
    this.channels = channels
    this.icon = icon

    this.client = new SimpleXMPP()
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
    const { id, client, store } = this

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
    // client.addListener('registered', () => {
    //   // Ask for full list of channels
    //   client.send('LIST')
    // })
  }
}
