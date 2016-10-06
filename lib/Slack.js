'use babel'

import {
  RtmClient,
  MemoryDataStore,
  RTM_EVENTS,
  CLIENT_EVENTS,
} from '@slack/client'

import TeamObject from './TeamObject'
import UserObject from './UserObject'
import ChannelObject from './ChannelObject'
import MessageObject from './MessageObject'

import {
 updateTeam,
 setAllUsers,
 addNewUser,
 addNewChannel,
 setAllChannels,
 updateChannel,
 addChannels,
 sendMessage,
 } from './actions'
import store from './store'

const RTM_CLIENT_EVENTS = CLIENT_EVENTS.RTM

export default class Slack {
  constructor(options) {
    this.id = options.team_id
    this.userId = options.user_id
    this.name = options.team_name
    this.token = options.access_token

    this.rtm = new RtmClient(this.token, {
      logLevel: 'debug',
      dataStore: new MemoryDataStore(),
    })
    this.bind()
  }

  bind() {
    const { rtm, id, userId, name } = this

    rtm.on(RTM_EVENTS.MESSAGE,  (msg) => {
      const message = new MessageObject({
        senderId: msg.user,
        channelId: msg.channel,
        text: msg.text,
        createdAt: new Date(),
        state: 'new',
      })

      store.dispatch(sendMessage({ teamId: this.id, message }))
      if (this.getDisplayedChannel().id !== message.channelId) {
        this.incrementUnread(message)
      }
    });

    rtm.on(RTM_CLIENT_EVENTS.AUTHENTICATED, (rtmStartData) => {
      this.fullFillTeamInfo(rtmStartData.team)
      this.fullFillUsers(rtmStartData.users)
      this.fullFillChannels(rtmStartData.channels)
      this.fullFillDirectMessages(rtmStartData.ims)
      this.didConnect()
    })

    return this
  }

  connect() {
    this.rtm.start()
  }

  getDisplayedChannel() {
    const { currentTeam, activeChannels } = store.getState()
    return activeChannels[currentTeam.id] || {}
  }

  incrementUnread(msg) {
    const { channels } = store.getState()
    let channel = channels[this.id].find((ch) => ch.id === msg.channelId)
    channel.unreadCount += 1
    store.dispatch(updateChannel(channel))
  }

  send(message) {
    this.rtm.sendMessage(message.text, message.channelId, (err, msg) => {
      store.dispatch(sendMessage({ teamId: this.id, message }))
    })
  }

  didConnect() {
    const teamObject = new TeamObject({
      ...this.serialize(),
      status: 'online',
    })
    store.dispatch(updateTeam(teamObject))
  }

  fullFillTeamInfo(team) {
    if (!team.icon.image_default) {
      this.icon = team.icon.image_230
    }
  }

  fullFillUsers(users) {
    users = users.map((user) => {
      return new UserObject({
        id: user.id,
        teamId: this.id,
        username: user.name,
        displayName: user.profile.real_name,
        avatar: user.profile.image_192,
      })
    })
    store.dispatch(setAllUsers({ users, teamId: this.id }))
  }

  fullFillChannels(channels) {
    channels = channels.map((channel) => {
      return new ChannelObject({
        id: channel.id,
        teamId: this.id,
        name: channel.name,
        type: 'group',
        topic: channel.topic,
        memberIds: channel.members,
        isMember: channel.is_member,
        unreadCount: channel.unread_count,
        lastRead: channel.last_read,
      })
    })
    store.dispatch(addChannels({ channels, teamId: this.id }))
  }

  fullFillDirectMessages(dms) {
    channels = dms.map((channel) => {
      return new ChannelObject({
        id: channel.id,
        teamId: this.id,
        name: this.rtm.dataStore.getUserById(channel.user).name,
        type: 'dm',
        memberIds: [channel.user, this.userId],
        isMember: true,
        unreadCount: channel.unread_count,
        lastRead: channel.last_read,
      })
    })
    store.dispatch(addChannels({ channels, teamId: this.id }))
  }

  serialize() {
    const { id, name, userId, icon } = this

    return {
      id,
      name,
      userId,
      icon,
    }
  }
}