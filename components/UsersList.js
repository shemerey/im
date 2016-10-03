'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import UserInAList from './UserInAList'

class UsersList extends Component {
  render() {
    const { channels, users } = this.props

    return (
      <div className="direct-messages">
        <h3>
            <i className="icon icon-comment-discussion"/>Direct Messages
            <span className="counter">({Object.keys(users).length})</span>
        </h3>
        <ul>
          {channels.map((ch) => <UserInAList {...ch} channel={ch}  />)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users[state.currentTeam.id],
    channels: state.channels[state.currentTeam.id].filter((ch) => ch.type === 'dm') || [],
  }
}

export default connect(mapStateToProps)(UsersList)
