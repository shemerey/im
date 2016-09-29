'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import SideBar from './SideBar'
import Main from './Main'
import Loader from './Loader'

class App extends Component {
  render() {
    if (this.props.teams.lenght) {
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
    teams: state.teams || [],
  }
}

export default connect(mapStateToProps)(App)
