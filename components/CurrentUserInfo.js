'use babel'

import React, {PropTypes, Component} from 'react'

export default class CurrentUserInfo extends Component {
  render() {
    return (
      <div className="user-info">
        <div className="team-name">Atom</div>
        <div className="user-name">@shemerey</div>
      </div>
    )
  }
}
