'use babel'

import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import Message from './Message'

class MessagesList extends Component {
  render() {
    const { messages } = this.props

    if (!messages) {
      return <div className="messages-view">
                <h2>You are going to be first</h2>
             </div>
    }

    return (
      <div className="messages-view">
       {messages.map((msg, index) => {
          return <Message key={index} {...msg} />
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages[`${state.currentTeam}${state.currentChannel.id}`]
  }
}

export default connect(mapStateToProps)(MessagesList)
