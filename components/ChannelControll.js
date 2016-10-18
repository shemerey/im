'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { SignIn, SignOut } from './Icons'
import ChannelObject from '../lib/ChannelObject'
import TeamObject from '../lib/TeamObject'

// Style
import colors from './colors'
import styled from 'styled-components'

const ChannelControllElement = styled.span`
  display: flex;
  font-size: 15px;

  cursor: pointer;
  &:hover {
    color: ${colors.textHighlight};
  }

  svg {
    margin-left: 7px;
  }
`

class ChannelControll extends Component {
  static
  propTypes = {
    channel: PropTypes.instanceOf(ChannelObject),
    currentTeam: PropTypes.instanceOf(TeamObject),
  }

  joinOrLeaveTheChannel() {
    const { currentTeam, channel, channel: { isMember } } = this.props

    if (isMember) {
      currentTeam.leave(channel)
    } else {
      currentTeam.join(channel)
    }
  }

  render() {
    return (
      <ChannelControllElement onClick={() => ::this.joinOrLeaveTheChannel()}>
        <span>{this.props.channel.isMember ? 'Leave' : 'Join' }</span>
        {' '}
        {this.props.channel.isMember ? <SignIn /> : <SignOut />}
      </ChannelControllElement>
    )
  }
}


function mapStateToProps(state) {
  return {
    currentTeam: state.currentTeam,
  }
}

export default connect(mapStateToProps)(ChannelControll)
