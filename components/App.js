'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import SideBar from './SideBar'
import Main from './Main'
import Loader from './Loader'

class App extends Component {
  app() {
    return (
      <div className="im">
        <SideBar />
        <Main />
      </div>
    )
  }

  render() {
    const appIsReady = true //false
    return (appIsReady ? this.app() : <Loader />)
  }
}

export default connect()(App)
