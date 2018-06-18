const expect = require('expect');
// const chai = require('chai');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let origin = 'Test User';
    let text = 'some message';
    let message = generateMessage(origin, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      origin,
      text
    });

    // store res in var
    // assert from matches val passed in
    // assert text matches val passed in
    // assert createdAt === num
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let origin = 'some user';
    let lat = 15;
    let long = 19;
    let url = 'https://www.google.com/maps?q=15,19'
    let message = generateLocationMessage(origin, lat, long)

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      origin,
      url
    });
  });
});
