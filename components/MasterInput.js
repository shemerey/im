'use babel'

import React, { PropTypes, Component } from 'react'
import { FileIcon, SmileIcon } from './Icons'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'
import TeamLoader from '../lib/TeamLoader'
import Sounds from '../lib/Sounds'
import MessageObject from '../lib/MessageObject'
import colors from './colors'

// Style
import styled from 'styled-components'
const MasterInputElement = styled.div`
border-top: 1px solid ${colors.baseBorder};
background-color: ${colors.baseBackground};

bottom: 0;
right: 0;

.container {
  border: 1px solid ${colors.baseBorder};
  background-color: ${colors.appBackground};
  margin: 9px;
  padding-right: 7px;
  display: flex;
}

.btn {
  border: none;
  border-radius: 0px 3px 3px 0px;
}

.file-icon {
  display: flex;
  align-items: center;
}

.smile-icon {
  display: flex;
  align-items: center;
}

.input-container {
  flex: 1;
  padding: 5px 0;
  margin: auto;
}

atom-text-editor {
  background-color: ${colors.appBackground};
}

.im-editor {
  &::shadow {
    .cursor-line {
      background-color: ${colors.appBackground};
    }

    .gutter {
      display: none;
    }
  }
}
`

class MasterInput extends Component {
  constructor(props) {
    super(props)
    this.editor = atom.workspace.buildTextEditor()
    this.teamFactory = new TeamLoader()
  }

  componentDidMount() {
    this.editor.setGrammar(atom.grammars.selectGrammar('file.md'))
    this.editor.setPlaceholderText('Hi there ...')
    this.editor.getElement().classList.add('im-editor')
    this.editorContainer.appendChild(this.editor.getElement())
  }

  shouldComponentUpdate() {
    return false;
  }

  currentTeamProvider() {
    return this.teamFactory.getAllTeams().find(client => client.getId() === this.props.currentTeam)
  }

  sendMessage(event) {
    event.preventDefault()
    if (this.editor.getText().trim().length === 0) {
      return
    }

    const { dispatch, currentTeam, currentChannel, currentUser } = this.props
    const message = new MessageObject({
      senderId: currentUser.id,
      teamId: currentTeam.id,
      channelId: currentChannel.id,
      text: this.editor.getText().trim(),
      createdAt: (new Date()).getTime(),
      state: 'new',
    })


    setTimeout(() => {
      this.editor.setText('')
    }, 0)

    currentTeam.send(message)
    Sounds.beep()
  }

  render() {

    const map = {
      'sendMessage': 'enter',
    }

    const handlers = {
      'sendMessage': ::this.sendMessage,
    }

    return (
      <HotKeys keyMap={map} handlers={handlers}>
        <MasterInputElement>
          <div className="container">
            <button className='inline-block btn file-icon'>
              <FileIcon />
            </button>
            <div
              className="input-container"
              ref={(node) => { this.editorContainer = node }}
              onKeyPress={this.handleKeyPress}
            >
              {/* EditorElement here it has 'im-editor' class */}
            </div>
            <div className="smile-icon">
              <SmileIcon />
            </div>
          </div>
        </MasterInputElement>
      </HotKeys>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentTeam: state.currentTeam,
    currentChannel: state.activeChannels[state.currentTeam.id],
    currentUser: state.users[state.currentTeam.id][state.currentTeam.userId],
  }
}

export default connect(mapStateToProps)(MasterInput)
