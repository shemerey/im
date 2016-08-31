'use babel'

import IRC from './IRC'
import XMPP from './XMPP'

import { addTeam } from '../actions'
import listToConnect from '../listToConnect'

let instance = null
export default class ProviderFactory {

  constructor(store) {
    if (!instance) {
      instance = this
    } else {
      return instance
    }

    this.store = store
    this.listOfAvaliableProvides = {
      IRC,
      XMPP,
    }

    this.listToConnect = listToConnect
    return instance
  }

  getAllTeams() {
    return this.teams
  }

  // instantiate all teams
  perform() {
    this.teams = this.listToConnect.map((options) => {
      const team = new this.listOfAvaliableProvides[options.type](this.store, options)
      this.store.dispatch(addTeam(team))
      return team
    })
  }
}
