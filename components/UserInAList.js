'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { OnlineIcon, OfflineIcon, DoNotDisturbIcon } from './Icons'

import { setActiveChannel } from '../lib/actions'

class UserInAList extends Component {
  selectThisChannel() {
    const { teamId, channel, dispatch } = this.props
    dispatch(setActiveChannel({ teamId, channel }))
  }

  render() {
    const { name, id, selectedChannel } = this.props

    return (
      <li
        onClick={(e) => { ::this.selectThisChannel() }}
        className={classNames({ active: id === selectedChannel.id})}
      >
        { name }
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    teamId: state.currentTeam.id,
    selectedChannel: state.activeChannels[state.currentTeam.id] || {},
  }
}

export default connect(mapStateToProps)(UserInAList)
