'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import SwitchTeam from './SwitchTeam'
import CurrentUserInfo from './CurrentUserInfo'
import ChannelsList from './ChannelsList'
import UsersList from './UsersList'
import Loader from './Loader'

class SideBar extends Component {

  teamsBar() {
    const { teams } = this.props

    return (
      <div className="teams">
        <ul>
          {teams.map((team, index) => <SwitchTeam key={team.id} order={index} team={team} />)}
        </ul>
      </div>
    )
  }

  currentTeamChannelsBar() {
    if (this.props.currentTeam.status === 'new') {
      return <Loader/>
    }

    return (
      <div className="team-details">
        <CurrentUserInfo />
        <ChannelsList />
        <UsersList />
      </div>
    )
  }

  render() {
    return (
      <div className="im-side-bar">
        {this.teamsBar()}
        {this.currentTeamChannelsBar()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams,
    currentTeam: state.currentTeam,
  }
}

export default connect(mapStateToProps)(SideBar)
