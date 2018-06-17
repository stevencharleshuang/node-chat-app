const socket    = io();
const timestamp = Date.now();

socket.on('connect', () => {
  console.log('<<< Client: Connected to socket');

  socket.emit('createEmail', {
    to: 'someone@test.com',
    text: 'sup, bo?',
    from: socket.id,
    createdAt: timestamp,
  });
});

socket.on('disconnect', () => {
  console.log('<<< Client: Disconnected from server');
});

socket.on('newEmail', (email) => {
  console.log('<<< Client: New Email: ', email)
});
