'use babel';

import TeamObject from '../lib/TeamObject'
import UserObject from '../lib/UserObject'
import ChannelObject from '../lib/ChannelObject'

// Action
import {
  // Team
  addNewTeam,
  updateTeam,
  setCurrentTeam,
  // User
  setAllUsers,
  addChannels,
  addNewUser,
  updateUser,
  // Channel
  setAllChannels,
  setActiveChannel,
  addNewChannel,
  updateChannel,
  // Messages
  sendMessage,
} from '../lib/actions'

// Reducers
import {
  teams,
  currentTeam,
  users,
  activeChannels,
  channels,
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

  const [u1, u2] = [
    new UserObject({
      id: 'u1id',
      teamId: 111,
      username: 'firstUser',
    }),
    new UserObject({
      id: 'u2id',
      teamId: 111,
      username: 'secondUser',
    }),
  ]

  const [ch1, ch2, ch3] = [
    new ChannelObject({
      id: 'ch1id',
      teamId: 'xxx',
      isMember: false,
      name: 'First Channel',
    }),

    new ChannelObject({
      id: 'ch2id',
      teamId: 'xxx',
      isMember: true,
      name: 'Second Channel',
    }),

    new ChannelObject({
      id: 'ch3id',
      teamId: 'xxx',
      isMember: false,
      name: 'Second Channel',
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

  describe('users', () => {
    it('sets all users', () => {
      expect(users({
        xxx: {
          u1id: u1,
          u2id: u2,
        },
      }, setAllUsers({
        teamId: 'xxx',
        users: [u1],
      }))).toEqual({
        xxx: {
          u1id: u1,
        },
      })

      expect(users({
        xxx: {
          u1id: u1,
          u2id: u2,
        },
      }, setAllUsers({
        teamId: 'xxx',
        users: [],
      }))).toEqual({
        xxx: {},
      })

      expect(users({}, setAllUsers({
        teamId: 'xxx',
        users: [u2],
      }))).toEqual({
        xxx: {
          u2id: u2,
        },
      })

      expect(users(undefined, setAllUsers({
        teamId: 'xxx',
        users: [u1, u2],
      }))).toEqual({
        xxx: {
          u1id: u1,
          u2id: u2,
        },
      })
    })

    it('Will not add new user if user already exists', () => {
      expect(users({
        [u1.teamId]: {
          u1id: u1,
        },
      }, addNewUser(u1))).toEqual({
        [u1.teamId]: {
          u1id: u1,
        },
      })
    })

    it('Will add new user', () => {
      expect(users(undefined, addNewUser(u1))).toEqual({
        [u1.teamId]: {
          u1id: u1,
        },
      })

      expect(users({}, addNewUser(u1))).toEqual({
        [u1.teamId]: {
          u1id: u1,
        },
      })

      expect(users({
        [u1.teamId]: {
          u1id: u1,
        },
      }, addNewUser(u2))).toEqual({
        [u1.teamId]: {
          u1id: u1,
          u2id: u2,
        },
      })
    })

    it('add new user when addNewUser action fiered', () => {
      expect(users({
        xxx: {
          u1id: u1,
          u2id: u2,
        },
      }, setAllUsers({
        teamId: 'xxx',
        users: [],
      }))).toEqual({
        xxx: {},
      })

      expect(users({}, setAllUsers({
        teamId: 'xxx',
        users: [u2],
      }))).toEqual({
        xxx: {
          u2id: u2,
        },
      })

      expect(users(undefined, setAllUsers({
        teamId: 'xxx',
        users: [u1, u2],
      }))).toEqual({
        xxx: {
          u1id: u1,
          u2id: u2,
        },
      })
    })
  })

  describe('activeChannels', () => {
    it('will add first channel where you is a member as active when setAllChannels fiered', () => {
      expect(activeChannels(undefined, setAllChannels({
        teamId: 'xxx',
        channels: [ch1, ch2, ch3],
      }))).toEqual({
        xxx: ch2,
      })
    })

    it('will add first channel where you is a member as active when addChannels fiered', () => {
      expect(activeChannels(undefined, addChannels({
        teamId: 'xxx',
        channels: [ch1, ch2, ch3],
      }))).toEqual({
        xxx: ch2,
      })
    })

    it('will NOT add first channel if you have active channel for setAllChannels, addChannels actions', () => {
      const activeChannel = new ChannelObject({
        id: 'someId',
        teamId: 'xxx',
        isMember: true,
        name: 'Some New Channel',
      })

      expect(activeChannels({
        xxx: ch2,
      }, setAllChannels({
        teamId: 'xxx',
        channels: [activeChannel],
      }))).toEqual({
        xxx: ch2,
      })

      expect(activeChannels({
        xxx: ch2,
      }, addChannels({
        teamId: 'xxx',
        channels: [activeChannel],
      }))).toEqual({
        xxx: ch2,
      })
    })

    it('will replace current active channel when setActiveChannel fiered', () => {
      const activeChannel = new ChannelObject({
        id: 'someId',
        teamId: 'xxx',
        isMember: true,
        name: 'Some New Channel',
      })

      expect(activeChannels({
        xxx: ch2,
      }, setActiveChannel(activeChannel))).toEqual({
        xxx: activeChannel,
      })
    })

    it('will add first channel where you is a member when addNewChannel is fiered', () => {
      expect(activeChannels(undefined, addNewChannel(ch2))).toEqual({
        xxx: ch2,
      })

      expect(activeChannels(undefined, addNewChannel(ch1))).toEqual({})
    })

    it('will not change existing active channel when addNewChannel fiered', () => {
      const activeChannel = new ChannelObject({
        id: 'someId',
        teamId: 'xxx',
        isMember: true,
        name: 'Some New Channel',
      })

      expect(activeChannels({
        xxx: ch2,
      }, addNewChannel(activeChannel))).toEqual({
        xxx: ch2,
      })
    })

    it('will set channel as active when no actice and updateChannel fiered', () => {
      expect(activeChannels(undefined, updateChannel(ch1))).toEqual({})
      expect(activeChannels(undefined, updateChannel(ch2))).toEqual({ xxx: ch2 })
    })

    it('will NOT set channel as active when there is an actice and updateChannel fiered', () => {
      const activeChannel = new ChannelObject({
        id: 'someId',
        teamId: 'xxx',
        isMember: true,
        name: 'Some New Channel',
      })

      expect(activeChannels({
        xxx: ch2,
      }, updateChannel(activeChannel))).toEqual({
        xxx: ch2,
      })

      expect(activeChannels({
        xxx: ch2,
      }, updateChannel(ch1))).toEqual({
        xxx: ch2,
      })
    })
  })

  describe('channels', () => {
    it('sets channels', () => {
      expect(channels(undefined, setAllChannels({
        teamId: 'xxx',
        channels: [ch1, ch2],
      }))).toEqual({
        xxx: {
          [ch1.id]: ch1,
          [ch2.id]: ch2,
        },
      })
    })

    it('replace existing channels when setAllChannels action fiered', () => {
      expect(channels({
        xxx: {},
      }, setAllChannels({
        teamId: 'xxx',
        channels: [ch1],
      }))).toEqual({
        xxx: {
          [ch1.id]: ch1,
        },
      })
    })

    it('adds channels', () => {
      expect(channels({
        xxx: {
          [ch1.id]: ch1,
        },
      }, addChannels({
        teamId: 'xxx',
        channels: [ch1, ch2],
      }))).toEqual({
        xxx: {
          [ch1.id]: ch1,
          [ch2.id]: ch2,
        },
      })
    })

    it('adds new Channel', () => {
      expect(channels({
        xxx: {
          [ch1.id]: ch1,
        },
      }, addNewChannel(ch2))).toEqual({
        xxx: {
          [ch1.id]: ch1,
          [ch2.id]: ch2,
        },
      })
    })

    it('will update channel', () => {
      const changedChannel = new ChannelObject({
        id: ch1.id,
        teamId: ch1.teamId,
        name: 'Changed Name',
      })

      expect(channels({
        xxx: {
          [ch1.id]: ch1,
        },
      }, updateChannel(changedChannel))).toEqual({
        xxx: {
          [changedChannel.id]: changedChannel,
        },
      })
    })
  })
})
