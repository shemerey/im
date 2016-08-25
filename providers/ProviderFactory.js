'use babel'

import IrcProvider from './IrcProvider'

export default class ProviderFactory {
  constructor(store) {
    this.store = store
    this.listOfAvaliableProvides = {
      IrcProvider,
    }

    this.listToConnect = [
      {
        id: 1,
        name: 'brug',
        type: 'IrcProvider',
        icon: 'https://lh3.googleusercontent.com/ul6H_gVyLQ8for0vMtG-J6DoLE_IKMfI9iKcFGjZRnEJL1kE2W36YH-YupoM7TOZbObq=w200',
        server: 'brug.irc.slack.com',
        username: 'anton',
        password: "brug.4TXmDvXSMjV2buS9tRuC",
        channels: ['#general'],
      }
    ]
  }

  // instantiate all provides
  perform() {
    this.listToConnect.map( options => new this.listOfAvaliableProvides[options.type](this.store, options))
  }
}