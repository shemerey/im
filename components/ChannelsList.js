'use babel'

import React, { PropTypes, Component } from 'react'
import _ from 'underscore-plus'
import { connect } from 'react-redux'
import Channel from './Channel'

class ChannelsList extends Component {
  static
  get propTypes() {
    return {
      channels: PropTypes.array,
    }
  }

  render() {
    const { channels } = this.props

    return (
      <div className="channels">
        <h3>
          <i className="icon icon-comment" />
          channels
          <span className="counter"> ({channels.length})</span>
        </h3>
        <ul>
          {
            channels
            .filter(ch => ch.isMember)
            .map(ch => <Channel {...ch} channel={ch} />)
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const channels = _.values(state.channels[state.currentTeam.id] || {})
  return {
    channels: channels.filter(ch => ch.type === 'group'),
  }
}

export default connect(mapStateToProps)(ChannelsList)
