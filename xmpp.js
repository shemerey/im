'use babel'

var Client = require('node-xmpp-client')

var client = new Client({
  //       reconnect: true,
  jid: '375799_3090738@chat.hipchat.com',
  password: 'rBnApua4nx7aoUxMxfHxE',
  // jid: 'user@example.com',
  // password: 'password'
})



var x = 0
var old = x
var average = 0

setInterval(function () {
  var n = x - old
  console.log(n, average)
  average = (n + average) * 0.5
  old = x
}, 1e3)

var c = 0
client.on('stanza', function (stanza) {
  console.log('Received stanza: ', c++, stanza.toString())
  if (stanza.is('message') && stanza.attrs.type === 'chat') {
    var i = parseInt(stanza.getChildText('body'), 10)
    x = i
    var reply = new Client.Stanza('message', {
      to: stanza.attrs.from,
      from: stanza.attrs.to,
      type: 'chat'
    })
    reply.c('body').t(isNaN(i) ? 'i can count!' : ('' + (i + 1)))
    setTimeout(function () {
      client.send(reply)
    }, 321)
  }
})

client.on('online', function () {
  console.log('Client is online')
  client.send('<presence/>')
})


client.on('error', function (e) {
  console.error(e)
  process.exit(1)
})

process.on('exit', function () {
  client.end()
})
