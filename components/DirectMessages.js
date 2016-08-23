'use babel'

import React, {PropTypes, Component} from 'react'
import Online from './Online'
import Offline from './Offline'
import DoNotDisturb from './DoNotDisturb'

export default class DirectMessages extends Component {
  render() {
    // const { team } = this.props

    return (
      <div className="direct-messages">
        <h3><i className="icon icon-comment-discussion"/>Direct Messages <small>(4)</small></h3>
        <ul>
          <li><Online /> general</li>
          <li><Offline /> random</li>
          <li><DoNotDisturb /> RebelIcons</li>
          <li><Offline /> HaKaTon</li>
        </ul>
      </div>
    )
  }
}
