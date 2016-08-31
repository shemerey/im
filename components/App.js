'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setCurrentTeam } from '../actions'

import SideBar from './SideBar'
import Main from './Main'

 class App extends Component {
  render() {
    return (
      <div className="im">
        <SideBar />
        <Main />
      </div>
    )
  }
}

export default connect()(App)
