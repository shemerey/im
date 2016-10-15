'use babel'

import React, { Component } from 'react'

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

  input {
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

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { value: 'Hello!' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Wrapper>
        <form>
          <h1>Enter your team Access-Token</h1>
          <input
            ref="input"
            placeholder="xoxp-1287937492-0435475301-10453406710-3904834523"
            onChange={ this.handleChange }
            onFocus={() => { this.refs.input.select() }}
            onPaste={() => console.log(2222) }
            maxLength="80"
          />
          <button>Connect</button>
          <p>
            If you have no access token,
            you can read more about it <a href="https://github.com/shemerey/im/wiki/Access-Token">here</a>.
          </p>
        </form>
      </Wrapper>
    )
  }
}
