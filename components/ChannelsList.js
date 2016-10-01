'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'

import Channel from './Channel'

class ChannelsList extends Component {
  render() {
    let { channels } = this.props

    return (
      <div className="channels">
        <h3>
          <i className="icon icon-comment" /> channels
          <small>({channels.length})</small>
        </h3>
        <ul>
          {
            channels
            .filter((ch) => ch.isMember)
            .map((ch) => <Channel {...ch} channel={ch} />)
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels[state.currentTeam.id] || [],
  }
}

export default connect(mapStateToProps)(ChannelsList)
