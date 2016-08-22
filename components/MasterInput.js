'use babel'

import React, {PropTypes, Component} from 'react'
import File from './File'
import Smile from './Smile'

export default class MasterInput extends Component {
  constructor(props) {
    super(props)
    this.editor = atom.workspace.buildTextEditor()
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    // debugger
    this.editor.setGrammar(atom.grammars.selectGrammar("file.md"))
    this.editor.getElement().classList.add('im-editor')
    this.refs.editor.appendChild(this.editor.getElement())
  }

  render() {
    return (
      <div className="master-input">
        <div className="container">
          <button className='inline-block btn file-icon'>
            <File />
          </button>
          {/* <div className=""></div> */}
          <div className="input-container" ref="editor">
            {/* EditorElement here it has 'im-editor' class */}
          </div>
          <div className="smile-icon">
            <Smile />
          </div>
        </div>
      </div>
    )
  }
}
