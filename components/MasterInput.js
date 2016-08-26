'use babel'

import React, {PropTypes, Component} from 'react'
import { FileIcon, SmileIcon } from './Icons'
import { HotKeys } from 'react-hotkeys'
import { sendMessage } from '../actions'
import { connect } from 'react-redux'

export default class MasterInput extends Component {
  constructor(props) {
    super(props)
    this.editor = atom.workspace.buildTextEditor()
  }

  shouldComponentUpdate(nextProps) {
    return false;
  }

  componentDidMount() {
    this.editor.setGrammar(atom.grammars.selectGrammar("file.md"))
    this.editor.setPlaceholderText('Hi there ...')
    this.editor.getElement().classList.add('im-editor')
    this.refs.editor.appendChild(this.editor.getElement())
  }

  sendMessage(event) {
    event.preventDefault()

    const { dispatch, currentTeam, currentChannel, currentUser } = this.props
    const message = {
      teamId: currentTeam,
      username: currentUser,
      to: currentChannel,
      text: this.editor.getText()
    }

    this.editor.setText('')
    dispatch(sendMessage(message))
  }

  render() {

    const map = {
      'sendMessage': 'enter',
    }

    const handlers = {
      'sendMessage': ::this.sendMessage
    }

    return (
      <HotKeys keyMap={map} handlers={handlers}>
        <div className="master-input">
          <div className="container">
            <button className='inline-block btn file-icon'>
              <FileIcon />
            </button>
            <div className="input-container" ref="editor" onKeyPress={this.handleKeyPress}>
              {/* EditorElement here it has 'im-editor' class */}
            </div>
            <div className="smile-icon">
              <SmileIcon />
            </div>
          </div>
        </div>
      </HotKeys>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTeam: state.currentTeam,
    currentChannel: state.currentChannel,
    currentUser: 'anton'
  }
}

export default connect(mapStateToProps)(MasterInput)
