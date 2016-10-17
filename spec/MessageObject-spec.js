'use babel';

import MessageObject from '../lib/MessageObject';

describe('MessageObject', () => {
  const obj = {
    teamId: 'T04PLFYUL',
    senderId: 'U1NQC8JLD',
    channelId: 'D25QFV5ED',
    text: 'here is <https://github.com/github/github/pull/111>\n\n link.',
  }

  const [m1, m2] = [new MessageObject(obj), new MessageObject(obj)]

  it('has unique id for each new team', () => {
    expect(m1.id).not.toEqual(m2.id)
    expect(m1.id).toEqual(m1.id)
  })

  it(' is new by default', () => {
    const m = new MessageObject({})
    expect(m.state).toBe('new')
  });

  it('parses channel name properly', () => {
    const m = new MessageObject({
      text: 'Why not join <#C024BE7LR|general>?',
    })
    expect(m.content()).toEqual('Why not join <a className="channel" href="#C024BE7LR">#general</a>?')
  })

  it('parses channel name properly', () => {
    const m = new MessageObject({
      text: 'Why not join <#C024BE7LR>?',
    })
    expect(m.content()).toEqual('Why not join <a className="channel" href="#C024BE7LR">#C024BE7LR</a>?')
  })
})
