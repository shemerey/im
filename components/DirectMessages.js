'use babel'

import React, {PropTypes, Component} from 'react'
import { OnlineIcon, OfflineIcon, DoNotDisturbIcon } from './Icons'

export default class DirectMessages extends Component {
  render() {
    return (
      <div className="direct-messages">
        <h3><i className="icon icon-comment-discussion"/>Direct Messages <small>(4)</small></h3>
        <ul>
          <li><OnlineIcon /> general</li>
          <li><OfflineIcon /> random</li>
          <li><DoNotDisturbIcon /> RebelIcons</li>
          <li><OfflineIcon /> HaKaTon</li>
        </ul>
      </div>
    )
  }
}
