var xmpp = require('simple-xmpp');

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
