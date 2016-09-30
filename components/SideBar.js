'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import SwitchTeam from './SwitchTeam'
import CurrentUserInfo from './CurrentUserInfo'
import ChannelsList from './ChannelsList'
import UsersList from './UsersList'

class SideBar extends Component {
  render() {
    const { teams } = this.props

    return (
      <div className="im-side-bar">
        <div className="teams">
          <ul>
            {teams.map((team, index) => <SwitchTeam key={team.id} order={index} team={team} />)}
          </ul>
        </div>
        <div className="team-details">
         <CurrentUserInfo />
         <ChannelsList />
         <UsersList />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams
  }
}

export default connect(mapStateToProps)(SideBar)
