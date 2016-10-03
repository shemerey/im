'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

 class CurrentUserInfo extends Component {
  render() {
    const { teamName, currentUser } = this.props

    return (
      <div className="user-info">
        <div className="team-name">{ teamName }</div>
        <div className="user-name">@{ currentUser.username }</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const currentUser = state.users[state.currentTeam.id].find((u) => u.id === state.currentTeam.userId)
  return {
    teamName: state.currentTeam.name,
    currentUser
  }
}

export default connect(mapStateToProps)(CurrentUserInfo)
