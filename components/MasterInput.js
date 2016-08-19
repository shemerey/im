'use babel'

import React, {PropTypes, Component} from 'react'
import {TextEditor} from 'atom'

export default class MasterInput extends Component {
  constructor(props) {
    super(props)
    this.editor = React.createElement('atom-text-editor')
  }

  render() {
    return (
      <div className="master-input">
        {this.editor}
      </div>
    )
  }
}
