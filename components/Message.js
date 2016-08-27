'use babel'

import React, {PropTypes, Component} from 'react'
import { FormattedTime } from 'react-intl'
import { MessageSentIcon, MessageRecivedIcon, DotsIcon } from './Icons'

export default class Message extends Component {
  messageOptions() {
    if ('sent' === this.props.status) {
      return <MessageSentIcon />
    }

    if ('recived' === this.props.status) {
      return <MessageRecivedIcon />
    }

    return <DotsIcon />
  }

  render() {
    const { text, created_at, username } = this.props

    return (
      <div className="im-message">
        <div className="gutter">
          <span className="username">
            <a href="#">@{username}</a>
          </span>
        </div>
        <div className="content">
          <span>{text}</span>
          <span>{this.messageOptions()}</span>
        </div>
      </div>
    )
  }
}

/*

export default class Message extends Component {
  render() {
    const { id, text, created_at, username} = this.props

    return (
      <div className="im-message">
        <div className="gutter">
          <a className="timestamp"><FormattedTime value={new Date(created_at)} format="hhmm" /></a>
        </div>
        <div className="content">
          <span className="username">
            <a href="#">@{username}</a>
          </span>
          <span>{text}</span>
        </div>
      </div>
    )
  }
}

*/
