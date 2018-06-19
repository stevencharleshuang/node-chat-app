const expect            = require('expect');
// import isRealString
const { isRealString }  = require('./validation');

// isRealString
// should reject non-string values
// should reject strings with only spaces
// should allow strings with non-space characters

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let res = isRealString(80);
    expect(res).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    let res = isRealString('   ');
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    let res = isRealString('Sthevvve');
    expect(res).toBe(true);
  });
});
