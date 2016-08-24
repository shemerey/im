'use babel'

import React, {PropTypes, Component} from 'react'
import { FileIcon, SmileIcon } from './Icons'

export default class MasterInput extends Component {
  constructor(props) {
    super(props)
    this.editor = atom.workspace.buildTextEditor()
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.editor.setGrammar(atom.grammars.selectGrammar("file.md"))
    this.editor.getElement().classList.add('im-editor')
    this.refs.editor.appendChild(this.editor.getElement())
  }

  render() {
    return (
      <div className="master-input">
        <div className="container">
          <button className='inline-block btn file-icon'>
            <FileIcon />
          </button>
          <div className="input-container" ref="editor">
            {/* EditorElement here it has 'im-editor' class */}
          </div>
          <div className="smile-icon">
            <SmileIcon />
          </div>
        </div>
      </div>
    )
  }
}
