'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { OnlineIcon, OfflineIcon, DoNotDisturbIcon } from './Icons'

import { setCurrentChannel } from '../actions'

class UserInAList extends Component {
  setThisChannelAsCurrent() {
    const { dispatch, id, name, teamId } = this.props
    dispatch(setCurrentChannel({teamId, id, name, type: 'personal'}))
  }

  render() {
    const { name, id, currentChannel } = this.props

    return (
      <li
        onClick={(e) => { ::this.setThisChannelAsCurrent() }}
        className={classNames({ active: id === currentChannel.id})}
      >
        {name}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    teamId: state.currentTeam,
    currentChannel: state.currentChannels[state.currentTeam] || {}
  }
}

export default connect(mapStateToProps)(UserInAList)
