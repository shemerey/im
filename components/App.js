'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HotKeys } from 'react-hotkeys'

import { setCurrentTeam } from '../actions'

import SideBar from './SideBar'
import Main from './Main'

 class App extends Component {
  render() {
    const map = {
      'setTeam1': 'command+1',
      'setTeam2': 'command+2',
    }

    const handlers = {
      setTeam1: (event) => this.props.dispatch(setCurrentTeam(1)),
      setTeam2: (event) => this.props.dispatch(setCurrentTeam(2))
    }

    return (
      <HotKeys keyMap={map} handlers={handlers}>
        <div className="im" ref="app">
          <SideBar />
          <Main />
        </div>
      </HotKeys>
    )
  }
}

export default connect()(App)
