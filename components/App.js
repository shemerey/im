'use babel'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import SideBar from './SideBar'
import Main from './Main'
import Loader from './Loader'
import ErrorScreen from './ErrorScreen'

class App extends Component {
  render() {
    if (this.props.imHasProblems.message) return (<ErrorScreen message={this.props.imHasProblems.message} />)
    if (this.props.imIsReady) return (
      <div className="im">
        <SideBar />
        <Main />
      </div>
    )
    // return loader by default
    return <Loader />
  }
}

function mapStateToProps(state) {
  return {
    imIsReady: state.imIsReady,
    imHasProblems: state.imHasProblems,
  }
}

export default connect(mapStateToProps)(App)
