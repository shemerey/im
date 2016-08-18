'use babel'

import React, {PropTypes, Component} from 'react'

export default class MasterInput extends Component {
  render() {
    return (
      <div className="master-input">
        <atom-panel className='padded'>
          <div className="inset-panel padded">Some inset content</div>
        </atom-panel>
      </div>
    )
  }
}
