'use babel'

import React, {PropTypes, Component} from 'react'
import { FileIcon, SmileIcon } from './Icons'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'
import TeamLoader from '../lib/TeamLoader'

export default class MasterInput extends Component {
  constructor(props) {
    super(props)
    this.editor = atom.workspace.buildTextEditor()
    this.teamFactory = new TeamLoader()
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

  currentTeamProvider() {
    return this.teamFactory.getAllTeams().find((client) => client.getId() === this.props.currentTeam)
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

    setTimeout(() => {
      this.editor.setText('')
    }, 0)

    this.currentTeamProvider().send(message)
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
    currentTeam: 1, //state.currentTeam,
    currentChannel: {}, //state.currentChannels[state.currentTeam] || {},
    currentUser: 'anton'
  }
}

export default connect(mapStateToProps)(MasterInput)
