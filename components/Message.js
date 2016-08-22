'use babel'

import React, {PropTypes, Component} from 'react'
import { FormattedTime } from 'react-intl'

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
