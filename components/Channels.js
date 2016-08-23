'use babel'

import React, {PropTypes, Component} from 'react'

export default class Channels extends Component {
  render() {
    return (
      <div className="channels">
        <h3><i className="icon icon-comment" />channels <small>(4)</small></h3>
        <ul>
          <li># general</li>
          <li># random</li>
          <li className="active"># RebelIcons</li>
          <li># HaKaTon</li>
        </ul>
      </div>
    )
  }
}
