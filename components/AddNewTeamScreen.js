'use babel'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { CompositeDisposable } from 'atom'

import { setStatus } from '../lib/redux/modules/status'
import TeamLoader from '../lib/TeamLoader'
import { TeamObject } from '../lib/objects'

// Style Section
import * as colors from './colors'
import styled from 'styled-components'
const Wrapper = styled.div`
font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, sans-serif;
margin-top: -70px;

  h1 {
    text-align: center;
    font-weight: 300;
    color: rgb(63, 68, 77);
    font-size: 36px;
    margin-bottom: 50px;
  }

  form {
    display: flex;
  }

  .im-token-input {
    width: 640px;
    font-size: 18px;
    font-weight: lighter;
    padding: 10px;
    background-color: ${colors.appBackground};
    border: 1px solid ${colors.baseBorder};
    border-radius: 3px;

    &::shadow {
      .placeholder-text {
        opacity: 0.65;
        color: ${colors.buttonBgHover};
      }
    }
  }

  button {
    margin: 0 5px;
    border-radius: 3px;
    color: rgb(121, 129, 142);
    font-size: 20px;
    padding: 10px 25px;
    text-shadow: none;
    border: 1px solid #181a1f;
    background-color: #353b45;
    &:hover {
      background-color: ${colors.buttonBgHover};
      color: ${colors.text};
    }
  }

  p {
    margin: 5px 10px;
    font-size: 16px;
    color: rgb(63, 68, 77);
  }

  a {
    color: rgb(121, 129, 142);
    text-decoration: underline;
    &:hover {
      text-decoration: none;
      color: ${colors.text};
    }
  }
`

class AddNewTeamScreen extends Component {
  static
  propTypes = {
    dispatch: PropTypes.function,
    teams: PropTypes.arrayOf(TeamObject),
  }

  constructor(props) {
    super(props)
    this.subscriptions = new CompositeDisposable()
    this.editor = atom.workspace.buildTextEditor({ mini: true })
    const disposable = atom.textEditors.add(this.editor)
    this.editor.onDidDestroy(() => {
      disposable.dispose()
    })

    this.editor.setPlaceholderText('xoxp-1287937492-0435475301-10453406710-3904834523')
    this.editor.getElement().classList.add('im-token-input')
  }

  componentDidMount() {
    this.editorContainer.appendChild(this.editor.getElement())
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'im:close-token-window': () => this.close(),
        'im:enter-token': () => this.saveTeam(),
      })
    )
  }

  saveTeam() {
    const { dispatch } = this.props
    const accessToken = this.editor.getText().trim()

    if (accessToken.length > 0) {
      dispatch(setStatus('inProgress'))
      const teamLoader = new TeamLoader()
      teamLoader.connect({ teamType: 'Slack', accessToken })
    }

    setTimeout(() => {
      this.editor.setText('')
      dispatch(setStatus('ready'))
    }, 300)
  }

  close() {
    const { teams, dispatch } = this.props

    if (teams.length > 0) {
      dispatch(setStatus('ready'))
    }
  }

  render() {
    return (
      <Wrapper>
        <h1>Enter your team Access-Token</h1>
        <form onSubmit={() => ::this.saveTeam()}>
          <div
            className="ac-editor"
            ref={(node) => { this.editorContainer = node }}
          >
            {/* mini editor here */}
          </div>
          <button type="submit">Connect</button>
        </form>
        <p>
          If you have no access token,
          you can read more about it <a tabIndex="-1" href="https://github.com/shemerey/im/wiki/Access-Token">here </a>.
          or you can <a tabIndex="-2" onClick={() => ::this.close()}> close this window</a>
        </p>
      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    teams: state.teams,
  }
}

export default connect(mapStateToProps)(AddNewTeamScreen)
