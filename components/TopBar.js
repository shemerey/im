'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { SearchIcon } from './Icons'

class TopBar extends Component {

  render() {
    const { name, members, topic } = this.props

    return (
      <div className="top-bar">
        <div className="title">
          <div className="name"># {name.replace(/^#/,'')}</div>
          <div className="desc">
            <div className="members">
             <small>[{members || 0}] members</small>
            </div>
            <div className="current-topic">
              {topic || 'You can setup your own topic here ...'}
            </div>
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
  const active = state.activeChannels[state.currentTeam] || []
  const currentChannel = active.find((ch) => ch.name === state.currentChannel) || {name: 'general'}
  const { name, members, topic } = currentChannel
  return {
    name,
    members,
    topic
  }
}

export default connect(mapStateToProps)(TopBar)
