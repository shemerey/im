'use babel';

import TeamObject from '../lib/TeamObject'
import {
  addNewTeam,
  updateTeam,
  setCurrentTeam,
} from '../lib/actions'

import {
  teams,
  currentTeam,
} from '../lib/reducers'

describe('Reducers', () => {
  const [t1, t2] = [
    new TeamObject({
      id: '1111',
      name: 'first',
    }),
    new TeamObject({
      id: '222',
      name: 'second',
    }),
  ]

  describe('teams', () => {
    it('returns empty array by default', () => {
      expect(teams(undefined, { type: 'wrongType' })).toEqual([])
    })

    it('add new team to state', () => {
      expect(teams([], addNewTeam(t1))).toEqual([t1])
      expect(teams([t1], addNewTeam(t2))).toEqual([t1, t2])
    })

    it('update team', () => {
      const changedTeam = new TeamObject({
        id: t1.id,
        name: 'chnaged',
      })
      expect(teams([t1], updateTeam(changedTeam))).toEqual([changedTeam])
    })
  })

  describe('currentTeam', () => {
    it('is null by default (not set)', () => {
      expect(currentTeam(undefined, { type: 'wrongType' })).toEqual(null)
    })

    it('set current tam if no team before and you add new', () => {
      expect(currentTeam(undefined, addNewTeam(t1))).toEqual(t1)
    })

    it('will not change existing team for addNewTeam action', () => {
      expect(currentTeam(t1, addNewTeam(t2))).toEqual(t1)
    })

    it('will not change currentTeam if an other team was updated', () => {
      expect(currentTeam(t1, updateTeam(t2))).toEqual(t1)
    })

    it('will update currentTeam if update team action fiered for currentTeam', () => {
      const changedTeam = new TeamObject({
        id: t1.id,
        name: 'chnaged',
      })
      expect(currentTeam(t1, updateTeam(changedTeam))).toEqual(changedTeam)
    })

    it('will set currentTeam', () => {
      expect(currentTeam(t1, setCurrentTeam(t2))).toEqual(t2)
      expect(currentTeam(t1, setCurrentTeam(t1))).toEqual(t1)
      expect(currentTeam(null, setCurrentTeam(t1))).toEqual(t1)
      expect(currentTeam(t1, setCurrentTeam(null))).toEqual(t1)
    });
  })
})
