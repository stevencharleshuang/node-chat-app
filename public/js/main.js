const socket    = io();
const timestamp = Date.now();

socket.on('connect', () => {
  console.log('<<< Client: Connected to socket');

});

socket.on('disconnect', () => {
  console.log('<<< Client: Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('<<< Client: New Message: ', message)
});
