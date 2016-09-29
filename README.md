# Atom @ IM

`Atom @ IM` is a integrated `Chat` system for the Hackable Atom Editor.

 ----

    Under Heavy development, not ready for use

It provides a top-level API, and GUI to its consumer that allows them to send and receive
messages, easily and connect all chat systems right in your editor.

Press `Ctrl`-`Option`-`CMD`-`m` to start `Atom@IM`,  you should specify you connection in `~/.atom/ims.cson`

![Atom@IM](https://cloud.githubusercontent.com/assets/31591/18161000/ab04e8b8-7038-11e6-82ec-7d482e7ed82a.png)

## Installation

Clone the project

```bash
$ git clone https://github.com/shemerey/im.git && cd im
```

Install dependencies

```bash
$ apm i
```

Link package

```bash
$ apm link .
```

Create file `~/.atom/ims.cson` and configure it

### Config

```cscon
"BRUG-XMPP":
  type: "XMPP"
  icon: "https://s3-us-west-2.amazonaws.com/slack-files2/avatars/2016-08-25/72857911156_98fa7e5777a8f5c61014_88.jpg"
  options:
    username: "anton"
    jid: "anton@brug.xmpp.slack.com"
    password: "brug.9MDkvDbijblVjjaCEwev"
    host: "brug.xmpp.slack.com"
    conference: "conference.brug.xmpp.slack.com"
    port: 5222
    channels: ['general']
"BRUG-IRC":
  type: "IRC"
  icon: "http://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-Chat-Irc-icon.png"
  options:
    username: "shemereyis"
    host: "irc.dollyfish.net.nz"
    password: "brug.4TXmDvXSMjV2buS9tRuC"
    channels: ['#test']
```
