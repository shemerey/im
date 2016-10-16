'use babel'

import React, { Component } from 'react'
import { HotKeys } from 'react-hotkeys'
import { connect } from 'react-redux'

import { registerTheTeam, setStatus } from '../lib/actions'
import TeamLoader from '../lib/TeamLoader'

// Style Section
import colors from './colors'
import styled from 'styled-components'
const Wrapper = styled.div`
font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, sans-serif;
margin-top: -70px;

  h1 {
    text-align: center;
    font-weight: 300;
    color: rgba(157, 165, 180, 0.2);
    font-size: 36px;
    margin-bottom: 50px;
  }

  form {
    display: flex;
  }

  .token-input {
    width: 640px;
    font-size: 18px;
    font-weight: lighter;
    padding: 10px;
    background-color: ${colors.appBackground};
    border: 1px solid ${colors.baseBorder};
    border-radius: 3px;
  }

  ::-webkit-input-placeholder {
    opacity: 0.7;
    color: ${colors.buttonBgHover};
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
    color: rgba(157, 165, 180, 0.2);
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
  constructor(props) {
    super(props)
    this.editor = atom.workspace.buildTextEditor({
      mini: true,
    })
  }

  componentDidMount() {
    this.editor.setPlaceholderText('xoxp-1287937492-0435475301-10453406710-3904834523')
    this.editor.getElement().classList.add('token-input')
    this.refs.editor.appendChild(this.editor.getElement())
  }

  saveTeam(event) {
    event.preventDefault()
    const accessToken = this.editor.getText().trim()

    if (accessToken.length > 0) {
      this.props.dispatch(setStatus('inProgress'))
      const teamLoader = new TeamLoader()
      teamLoader.connect({ teamType: 'Slack', accessToken })
    }

    setTimeout(() => {
      this.editor.setText('')
      this.props.dispatch(setStatus('ready'))
    }, 300)
  }

  render() {
    const map = {
      'sendMessage': 'enter',
    }

    const handlers = {
      'sendMessage': ::this.saveTeam,
    }

    return (
      <HotKeys keyMap={map} handlers={handlers}>
        <Wrapper>
            <h1>Enter your team Access-Token</h1>
            <form onSubmit={::this.saveTeam}>
              <div className="ac-editor" ref="editor" onKeyPress={this.handleKeyPress}>
              {/* mini editor here */}
              </div>
              <button type="submit">Connect</button>
            </form>
            <p>
              If you have no access token,
              you can read more about it <a href="https://github.com/shemerey/im/wiki/Access-Token">here</a>.
            </p>
        </Wrapper>
      </HotKeys>
    )
  }
}

export default connect()(AddNewTeamScreen)
