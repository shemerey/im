'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import SideBar from './SideBar'
import Main from './Main'
import Loader from './Loader'

class App extends Component {
  render() {
    const { teams, currentTeam } = this.props

    if (teams.length > 0 && currentTeam) {
      return (
        <div className="im">
          <SideBar />
          <Main />
        </div>
      )
    }

    // return loader by default
    return <Loader />
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams,
    currentTeam: state.currentTeam,
  }
}

export default connect(mapStateToProps)(App)
