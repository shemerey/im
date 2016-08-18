'use babel'

import React, {PropTypes, Component} from 'react'

export default class DirectMessages extends Component {
  render() {
    // const { team } = this.props

    return (
      <div className="direct-messages">
        <h3>Direct Messages <small>(4)</small></h3>
        <ul>
          <li># general</li>
          <li># random</li>
          <li># RebelIcons</li>
          <li># HaKaTon</li>
        </ul>
      </div>
    )
  }
}
