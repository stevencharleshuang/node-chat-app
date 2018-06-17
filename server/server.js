const express   = require('express');
const socketIO  = require('socket.io');
const path      = require('path');
const http      = require('http');
const app       = express();
const PORT      = process.env.PORT || 3000;
const server    = http.createServer(app);
const io        = socketIO(server);

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

const timestamp = Date.now();

io.on('connection', (socket) => {
  console.log('>>> Server: New User Connected');

  socket.emit('newEmail', {
    from: 'test@test.com',
    text: 'sup',
    createdAt: timestamp,
  });

  socket.on('createEmail', (newEmail) => {
    console.log('>>> Server: createEmail = ', newEmail)
  });

  socket.on('disconnect', () => {
    console.log('>>> Server: User was disconnected');
  })
});

server.listen(PORT, () => {
  console.log(`>>> Server is up port: ${PORT} env: ${app.get('env')}`);
});
