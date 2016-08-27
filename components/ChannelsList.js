'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'

import Channel from './Channel'

class ChannelsList extends Component {
  channelsCounter() {
    return <small>({this.props.channels.length})</small>
  }

  render() {
    let { channels } = this.props

    return (
      <div className="channels">
        <h3>
          <i className="icon icon-comment" /> channels {this.channelsCounter()}
        </h3>
        <ul>
          {channels.map((channel) => <Channel key={channel.name} {...channel} />)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channels: state.activeChannels[state.currentTeam]
  }
}

export default connect(mapStateToProps)(ChannelsList)
