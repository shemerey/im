'use babel'

import fs from 'fs-plus'
import path from 'path'

import {
  RtmClient,
  WebClient,
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
 setActiveChannel,
 setAllChannels,
 updateChannel,
 addChannels,
 sendMessage,
 replaceMessage,
 } from './actions'
import store from './store'

const RTM_CLIENT_EVENTS = CLIENT_EVENTS.RTM

export default class Slack {
  constructor(options) {
    this.id = options.team_id || options.id
    this.userId = options.user_id || options.userId
    this.name = options.team_name || options.name
    this.accessToken = options.access_token || options.accessToken

    this.rtm = new RtmClient(this.accessToken, {
      logLevel: 'debug',
      dataStore: new MemoryDataStore(),
    })

    this.web = new WebClient(this.accessToken)
    this.bind()
  }

  bind() {
    const { rtm, id, userId, name } = this

    rtm.on(RTM_EVENTS.MESSAGE, (msg) => {
      if (msg.type !== 'message' || msg.subtype) {
        return
      }

      const message = new MessageObject({
        id: msg.ts,
        senderId: msg.user,
        channelId: msg.channel,
        teamId: this.id,
        text: msg.text,
        createdAt: msg.ts * 1000,
        state: 'recived',
      })

      store.dispatch(sendMessage(message))
      if (this.getDisplayedChannel().id !== message.channelId) {
        this.incrementUnread(message)
      }
    });

    rtm.on(RTM_CLIENT_EVENTS.AUTHENTICATED, (rtmStartData) => {
      // set up connection data
      this.id = rtmStartData.team.id
      this.userId = rtmStartData.self.id
      this.name = rtmStartData.self.name

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
    let channel = channels[this.id][msg.channelId]

    if (!channel) {
      const obj = this.rtm.dataStore.getChannelGroupOrDMById(msg.channelId)

      if (obj.is_group) {
        // clean up private group name
        const name = obj.name
          .replace(/--/gi, ', ')
          .replace(/^[^-]+-/, '')
          .replace(/-\d?/, '')

        channel = new ChannelObject({
          id: obj.id,
          teamId: this.id,
          name,
          type: 'group',
          memberIds: obj.members,
          isMember: obj.is_mpim,
          unreadCount: obj.unread_count,
          lastRead: obj.last_read,
        })
      }
    } else {
      channel.unreadCount += 1
    }

    store.dispatch(updateChannel(channel))
  }

  send(message) {
    store.dispatch(sendMessage(message))
    this.rtm.sendMessage(message.text, message.channelId, (err, msg) => {
      if (!msg) { return }
      const newMessage = new MessageObject({
        ...message.serialize(),
        id: msg.ts,
        state: 'sent',
      })
      store.dispatch(replaceMessage(message, newMessage))
    })
  }

  history(channel, options = {}) {
    if ('group' === channel.type) {
      return this.web.channels.history(channel.id, options)
    } else {
      return this.web.im.history(channel.id, options)
    }
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

  fullFillUsers(rawUsers) {
    const users = rawUsers.map((user) => {
      return new UserObject({
        id: user.id,
        teamId: this.id,
        username: user.name,
        displayName: user.profile.real_name,
        avatar: user.profile.image_72,
      })
    })
    store.dispatch(setAllUsers({ users, teamId: this.id }))
  }

  fullFillChannels(rawChannels) {
    const channels = rawChannels.map((channel) => {
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
    store.dispatch(setActiveChannel(channels.filter(ch => ch.isMember)[0]))
  }

  fullFillDirectMessages(dms) {
    const channels = dms.map((channel) => {
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
    const { id, name, userId, icon, accessToken } = this

    return {
      id,
      name,
      userId,
      icon,
      accessToken,
    }
  }
}
