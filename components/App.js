'use babel'

import React, { Component } from 'react'

// Components
import SideBar from './SideBar'
import Main from './Main'

export default class App extends Component {
  render() {
    return (
      <div className="im">
        <SideBar />
        <Main />
      </div>
    )
  }
}
