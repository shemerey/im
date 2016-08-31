'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import UserInAList from './UserInAList'

class UsersList extends Component {
  render() {
    const { users } = this.props

    return (
      <div className="direct-messages">
        <h3><i className="icon icon-comment-discussion"/>Direct Messages <small>(4)</small></h3>
        <ul>
          {users.map((user) => <UserInAList key={user.id} {...user} />)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const channels = state.activeChannels[state.currentTeam] || []
  return {
    users: channels.filter((ch) => 'personal' === ch.type)
  }
}

export default connect(mapStateToProps)(UsersList)