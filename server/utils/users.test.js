const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
    {
      id: '1',
      name: 'Mike',
      room: 'testRoom'
    },
    {
      id: '2',
      name: 'Dan',
      room: 'testRoom2'
    },
    {
      id: '3',
      name: 'Craig',
      room: 'testRoom'
    },
    ]
  });

  // addUser()
  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Steve',
      room: 'fakeRoom'
    };
    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([ user ]);
  });

  // removeUser()
  it('should remove a user', () => {
    let userId = '1';
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    let userId = '99';
    let user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  // getUser()
  it('should find user', () => {
    let userId = '3';
    let user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    let userId = '99';
    let user = users.getUser(userId);

    expect(user).toBeFalsy();
  });

  // getUserList()
  it('should return names for testRoom', () => {
    let userList = users.getUserList('testRoom');
    expect(userList).toEqual(['Mike', 'Craig'])
  });

  it('should return names for testRoom2', () => {
    let userList = users.getUserList('testRoom2');
    expect(userList).toEqual(['Dan'])
  })
});
