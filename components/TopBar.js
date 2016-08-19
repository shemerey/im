'use babel'

import React, {PropTypes, Component} from 'react'

export default class TopBar extends Component {
  render() {
    return (
      <div className="top-bar">
        <div className="title">
          <div className="name">#genral</div>
          <div className="name">
            <div className="members">234 members</div>
            <div className="current-topic">
              ᕕ( ᐛ )ᕗ Conference Number: 8477730181
              Start a call in this channel
              Channel SettingsShow Channel Details
            </div>
          </div>
        </div>
        <div className="search">

        </div>
      </div>
    )
  }
}
