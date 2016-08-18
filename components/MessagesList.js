'use babel'

import React, {PropTypes, Component} from 'react'
import Message from './Message'

// FIXME: replace with store
import messages from '../msgs'

export default class MessagesList extends Component {
  render() {

    return (
      <div className="messages-view">
       {messages.map((msg) => {
          return <Message key={msg.id} {...msg}/>
        })}
      </div>
    )
  }
}
