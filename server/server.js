const express             = require('express');
const socketIO            = require('socket.io');
const path                = require('path');
const http                = require('http');
const { generateMessage } = require('./utils/message');
const app                 = express();
const PORT                = process.env.PORT || 3000;
const server              = http.createServer(app);
const io                  = socketIO(server);
const publicPath          = path.join(__dirname, '../public');

app.use(express.static(publicPath));

const timestamp = Date.now();

io.on('connection', (socket) => {
  console.log('>>> Server: New User Connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('>>> Server: createMessage = ', message);

    io.emit('newMessage', generateMessage(socket.id, message.text));
    callback({
      message: 'This is from the server'
    });
    // socket.broadcast.emit('newMessage', {
    //   origin: socket.id,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

  });

  socket.on('disconnect', () => {
    console.log('>>> Server: User was disconnected');
  })
});

server.listen(PORT, () => {
  console.log(`>>> Server is up port: ${PORT} env: ${app.get('env')}`);
});
