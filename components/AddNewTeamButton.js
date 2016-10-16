'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { setStatus } from '../lib/actions'
import { PlusIcon } from './Icons'

// Style
import styled from 'styled-components'
import colors from './colors'
const AddNewTeamElement = styled.div`
  margin: 8px 5px;
  width: 32px;
  height: 32px;
  display: block;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${colors.textHighlight};
    box-sizing: border-box;
  }
`

class AddNewTeamButton extends Component {
  static
  get propTypes() {
    return {
      dispatch: PropTypes.function,
    }
  }

  render() {
    const { dispatch } = this.props
    return (
      <AddNewTeamElement onClick={() => dispatch(setStatus('addNewTeam'))}>
        <PlusIcon />
      </AddNewTeamElement>
    )
  }
}

export default connect()(AddNewTeamButton)
