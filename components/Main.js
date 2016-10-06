'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import TopBar from './TopBar'
import MessagesList from './MessagesList'
import MasterInput from './MasterInput'
import Loader from './Loader'

class Main extends Component {
  render() {
    if (this.props.currentTeam.status === 'new') {
      return <Loader />
    }

    return (
      <div className="im-main">
        <TopBar />
        <MessagesList />
        <MasterInput />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTeam: state.currentTeam,
  }
}

export default connect(mapStateToProps)(Main)
