'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

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
          {channels.map((channel) => {
            return  <li
                      key={channel.name}
                      className={classNames({ active: channel.active })}
                    >
                      # {channel.name.replace(/^#/,'')}
                    </li>
          })}
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
