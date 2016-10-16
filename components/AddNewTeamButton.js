'use babel'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { setStatus } from '../lib/actions'

// Style
import styled from 'styled-components'
import colors from './colors'
const AddNewTeamElement = styled.div`
  margin: 8px 5px;
  width: 32px;
  height: 32px;
  display: block;
  border-radius: 3px;

  &:hover {
    border: 2px solid ${colors.textHighlight};
    box-sizing: border-box;
  }
`

class AddNewTeamButton extends Component {
  static
  get propTypes() {
    return {
      team: PropTypes.object,
      order: PropTypes.number,
      dispatch: PropTypes.function,
      currentTeam: PropTypes.object,
    }
  }

  render() {
    const { dispatch } = this.props
    return (
      <AddNewTeamElement onClick={(e) => dispatch(setStatus('addNewTeam'))}>
       +
      </AddNewTeamElement>
    )
  }
}

export default connect()(AddNewTeamButton)
