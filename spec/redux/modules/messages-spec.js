'use babel';

import {
  MessageObject,
} from '../../../lib/objects'

import messages, {
  setAllMessages,
  addMessages,
  sendMessage,
  reciveMessage,
  updateMessage,
  replaceMessage,
} from '../../../lib/redux/modules/messages'


describe('messages reducer', () => {
  // const ch1 = new ChannelObject({
  //   id: 'test-id-user',
  //   teamId: 'some-team-id',
  // })
  //
  // const ch2 = new ChannelObject({
  //   id: 'test-id-user-2',
  //   teamId: 'some-team-id',
  // })
  //
  // it('is empty array by default (not set)', () => {
  //   expect(messages(undefined, { type: 'wrongType' })).toEqual({})
  // })
  //
  // it('adds team to the list', () => {
  //   expect(messages(undefined, addNewChannel(ch1))).toEqual({
  //     [ch1.teamId]: {
  //       [ch1.id]: ch1,
  //     },
  //   })
  //
  //   expect(messages({
  //     [ch1.teamId]: {
  //       [ch1.id]: ch1,
  //     },
  //   }, addNewChannel(ch2))).toEqual({
  //     [ch1.teamId]: {
  //       [ch1.id]: ch1,
  //       [ch2.id]: ch2,
  //     },
  //   })
  // })
  //
  // it('adds channel to the proper team', () => {
  //   const otheTeamChannal = new ChannelObject({
  //     id: 'test-id-user-2',
  //     teamId: 'some-OTHER-team-id',
  //   })
  //
  //   expect(messages({
  //     [ch1.teamId]: {
  //       [ch1.id]: ch1,
  //     },
  //   }, addNewChannel(otheTeamChannal))).toEqual({
  //     [ch1.teamId]: {
  //       [ch1.id]: ch1,
  //     },
  //     [otheTeamChannal.teamId]: {
  //       [otheTeamChannal.id]: otheTeamChannal,
  //     },
  //   })
  // })
  //
  // it('updates the team with the same id', () => {
  //   const nextCh1 = new ChannelObject({
  //     ...ch1,
  //     name: 'next',
  //   })
  //
  //   expect(messages({
  //     [ch1.teamId]: {
  //       [ch1.id]: ch1,
  //     },
  //   }, addNewChannel(nextCh1))).toEqual({
  //     [ch1.teamId]: {
  //       [ch1.id]: nextCh1,
  //     },
  //   })
  // });
})
