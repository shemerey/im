'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { SearchIcon } from './Icons'

class TopBar extends Component {

  render() {
    if (!this.props.currentChannel) return <div />;
    const { name } = this.props.currentChannel

    return (
      <div className="top-bar">
        <div className="title">
          <div className="name"># {222}</div>
          <div className="desc">
            <div className="members">
              <small>[{0}] members</small>
            </div>
            <div className="current-topic">{2}</div>
          </div>
        </div>
        <div className="search">
          <SearchIcon />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    teamId: state.currentTeam,
    currentChannel: state.currentChannels[state.currentTeam],
  }
}

export default connect(mapStateToProps)(TopBar)
