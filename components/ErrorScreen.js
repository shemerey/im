'use babel'

import React, { PropTypes, Component } from 'react'

export default class ErrorScreen extends Component {
  render() {
    return (
      <div className="im-full-screen-container">
        <div className="sk-cube-grid">
          {this.props.message}
        </div>
      </div>
    )
  }
}
