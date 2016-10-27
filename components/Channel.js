'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _ from 'underscore-plus'
import { setActiveChannel } from '../lib/redux/modules/activeChannels'

import { OfflineIcon, OnlineIcon } from './Icons'

// Style Section
import colors from './colors'
import classNames from 'classnames'
import styled from 'styled-components'
const ChannelElement = styled.div`
  padding: 2px 36px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.background};
  }
`


class Channel extends Component {
  static
  get propTypes() {
    return {
      teamId: PropTypes.string,
      channel: PropTypes.object,
      dispatch: PropTypes.function,
      name: PropTypes.string,
      id: PropTypes.string,
      selectedChannel: PropTypes.object,
    }
  }

  selectThisChannel() {
    const { teamId, channel, dispatch } = this.props
    dispatch(setActiveChannel(channel))
  }

  channelName() {
    const { channel, users } = this.props

    if (channel.type === 'group') {
      return `# ${channel.name}`
    } else {

      const isOnline = _.every(
        channel.memberIds.map(id => users[id]),
        (u) => { return !!u && u.status === 'online' }
      )

      return (
        <div>
          {isOnline ? <OnlineIcon /> : <OfflineIcon />}
          {' '}
          {channel.name}
        </div>
      )
    }
  }

  render() {
    const { id, channel, selectedChannel  } = this.props
    return (
      <ChannelElement
        key={ id }
        onClick={ (e) => ::this.selectThisChannel() }
        className={ classNames({
          active: id === selectedChannel.id,
          unread: channel.unreadCount > 0
        }) }
      >
        { this.channelName() }
      </ChannelElement>
    )
  }
}

function mapStateToProps(state) {
  return {
    teamId: state.currentTeam.id,
    users: state.users[state.currentTeam.id],
    selectedChannel: state.activeChannels[state.currentTeam.id] || {},
  }
}

export default connect(mapStateToProps)(Channel)
