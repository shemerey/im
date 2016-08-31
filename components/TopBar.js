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
          <div className="name"># {name}</div>
          <div className="desc">
            <div className="members">
              <small>[{members || 0}] members</small>
            </div>
            <div className="current-topic">{topic}</div>
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
  const { id, name, type } = state.currentChannel
  return {
    id,
    name,
    type,
  }
}

export default connect(mapStateToProps)(TopBar)
