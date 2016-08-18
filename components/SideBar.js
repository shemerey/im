'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import SwitchTeam from './SwitchTeam'

class SideBar extends Component {
  render() {
    const { teams } = this.props

    return (
      <div className="im-side-bar">
        <div className="teams">
          <ul>
            {teams.map((team) => <SwitchTeam team={team} />)}
          </ul>
        </div>
        <div className="chats">
         <div className="user-info">Anton</div>
         <ul className="channels">
           <li>#general</li>
           <li>#random</li>
           <li>#RebelIcons</li>
           <li>#HaKaTon</li>
         </ul>

         <ul className="direct-messages">
           <li>#general</li>
           <li>#random</li>
           <li>#RebelIcons</li>
           <li>#HaKaTon</li>
         </ul>
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
