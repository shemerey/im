'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import Message from './Message'

class MessagesList extends Component {
  render() {
    const { messages } = this.props

    if (!messages || messages.length === 0) {
      return <div className="messages-view">
                <h2>You are going to be first</h2>
             </div>
    }

    let first = {}
    let odd = true
    return (
      <div className="messages-view">
        {messages.map((msg, index) => {
          if (first.senderId != msg.senderId) { first = msg; odd = !odd }
          return <Message key={index} {...msg} first={msg === first} odd={odd} />
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const currentTeam = state.currentTeam
  const currentChannel = state.activeChannels[currentTeam.id]
  const messages = state.messages[`${currentTeam.id}#${currentChannel.id}`]

  return {
    currentTeam,
    currentChannel,
    messages,
  }
}

export default connect(mapStateToProps)(MessagesList)
