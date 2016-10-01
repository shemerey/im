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
import {
 updateTeam,
 setAllUsers,
 addNewUser,
 addNewChannel,
 setAllChannels,
 } from './actions'
import store from './store'

const RTM_CLIENT_EVENTS = CLIENT_EVENTS.RTM

export default class Slack {
  constructor(options) {
    this.id = options.team_id
    this.userId = options.user_id
    this.name = options.team_name
    this.token = options.access_token

    this.rtm = new RtmClient(this.token, { logLevel: 'debug' })
    this.bind()
  }

  bind() {
    const { rtm, id, userId, name } = this

    rtm.on(RTM_CLIENT_EVENTS.AUTHENTICATED, (rtmStartData) => {
      this.fullFillTeamInfo(rtmStartData.team)
      this.fullFillUsers(rtmStartData.users)
      this.fullFillChannels(rtmStartData.channels)
      this.didConnect()
    })

    return this
  }

  connect() {
    this.rtm.start()
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
      })
    })
    store.dispatch(setAllChannels({ channels, teamId: this.id }))
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
