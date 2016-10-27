'use babel'

import React, { PropTypes, Component } from 'react'
import { FileIcon, SmileIcon } from './Icons'
import { CompositeDisposable } from 'atom'
import { connect } from 'react-redux'
import TeamLoader from '../lib/TeamLoader'
import Sounds from '../lib/Sounds'
import { MessageObject } from '../lib/objects'
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
    this.teamFactory = new TeamLoader()
    this.subscriptions = new CompositeDisposable()

    this.editor = atom.workspace.buildTextEditor()
    const disposable = atom.textEditors.add(this.editor)
    this.editor.onDidDestroy(() => {
      disposable.dispose()
    })

    this.editor.setGrammar(atom.grammars.selectGrammar('text.md'))
    this.editor.setPlaceholderText('Hi there ...')
    this.editor.getElement().classList.add('im-editor')
  }

  componentDidMount() {
    this.editorContainer.appendChild(this.editor.getElement())
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'im:send': () => this.sendMessage(),
      })
    )
  }

  shouldComponentUpdate() {
    return false;
  }

  componentwillunmount() {
    this.subscriptions.dispose()
  }

  currentTeamProvider() {
    return this.teamFactory.getAllTeams().find(client => client.getId() === this.props.currentTeam)
  }

  sendMessage() {
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
    return (
      <MasterInputElement>
        <div className="container">
          <button className="inline-block btn file-icon">
            <FileIcon />
          </button>
          <div
            className="input-container"
            ref={(node) => { this.editorContainer = node }}
          >
            {/* EditorElement here it has 'im-editor' class */}
          </div>
          <div className="smile-icon">
            <SmileIcon />
          </div>
        </div>
      </MasterInputElement>
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
