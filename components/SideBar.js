'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import SwitchTeam from './SwitchTeam'
import CurrentUserInfo from './CurrentUserInfo'
import Channels from './Channels'
import DirectMessages from './DirectMessages'

class SideBar extends Component {
  render() {
    const { teams } = this.props

    return (
      <div className="im-side-bar">
        <div className="teams">
          <ul>
            {teams.map((team) => <SwitchTeam key={team.id} team={team} />)}
          </ul>
        </div>
        <div className="team-details">
         <CurrentUserInfo />
         <Channels />
         <DirectMessages />
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
