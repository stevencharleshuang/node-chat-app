const expect = require('expect');
// const chai = require('chai');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const origin = 'Test User';
    const text = 'some message';
    const message = generateMessage(origin, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      origin,
      text
    });

    // store res in var
    // assert from matches val passed in
    // assert text matches val passed in
    // assert createdAt === num
  })
})
