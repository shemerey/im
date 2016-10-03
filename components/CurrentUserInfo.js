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
  return {
    teamName: state.currentTeam.name,
    currentUser: state.users[state.currentTeam.id][state.currentTeam.userId],
  }
}

export default connect(mapStateToProps)(CurrentUserInfo)
