'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { setActiveChannel } from '../lib/actions'

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

  render() {
    const { name, id, channel, selectedChannel  } = this.props
    return (
      <ChannelElement
        key={ id }
        onClick={ (e) => ::this.selectThisChannel() }
        className={ classNames({
          active: id === selectedChannel.id,
          unread: channel.unreadCount > 0
        }) }
      >
        # { name }
      </ChannelElement>
    )
  }
}

function mapStateToProps(state) {
  return {
    teamId: state.currentTeam.id,
    selectedChannel: state.activeChannels[state.currentTeam.id] || {},
  }
}

export default connect(mapStateToProps)(Channel)
