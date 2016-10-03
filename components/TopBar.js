'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { SearchIcon } from './Icons'

class TopBar extends Component {

  render() {
    if (!this.props.currentChannel) {
      return <div/>
    }
    const { name, type, memberIds } = this.props.currentChannel

    return (
      <div className="top-bar">
        <div className="title">
          <div className="name">
            { type === 'group' ? '#' : '@'}
            { name }
          </div>
          <div className="desc">
            <div className="members">
              <small>{ memberIds.length } members</small>
            </div>
            {/* <div className="current-topic">{'topic here '}</div> */}
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
    currentChannel: state.activeChannels[state.currentTeam.id]
  }
}

export default connect(mapStateToProps)(TopBar)
