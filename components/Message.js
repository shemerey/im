'use babel'

import React, {PropTypes, Component} from 'react'

export default class Message extends Component {
  render() {
    const { id, text, created_at, username} = this.props

    return (
      <div className="im-message">
        <div className="gutter">
          <a class="timestamp">{created_at}</a>
        </div>
        <div className="content">
          {text}
        </div>
      </div>
    )
  }
}
