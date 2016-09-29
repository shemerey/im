'use babel';

import MessageObject from '../lib/MessageObject';

describe('MessageObject', () => {
  const obj = {
    text: 'new message here',
  }
  
  const  [m1, m2] = [new MessageObject(obj), new MessageObject(obj)]

  it('has unique id for each new team', () => {
    expect(m1.id).not.toEqual(m2.id)
    expect(m1.id).toEqual(m1.id)
  })

  it(' is new by default', () => {
    const m = new MessageObject({})
    expect(m.state).toBe('new')
  });
})
