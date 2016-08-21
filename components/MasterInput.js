'use babel'

import React, {PropTypes, Component} from 'react'
import { TextEditor } from 'atom'

export default class MasterInput extends Component {
  constructor(props) {
    super(props)
    this.editor = TextEditor()
  }

  componentShouldUpdate() {
    return false;
  }

  componentDidMount() {
    this.refs.editor.appendChild(this.editor.getElement())
  }

  render() {
    return (
      <div className="master-input" ref="editor">
        {/* EditorElement here */}
      </div>
    )
  }
}
