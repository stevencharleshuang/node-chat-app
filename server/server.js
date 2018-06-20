const express             = require('express');
const socketIO            = require('socket.io');
const path                = require('path');
const http                = require('http');
const {
  generateMessage,
  generateLocationMessage
}                         = require('./utils/message');
const { isRealString }    = require('./utils/validation');
const { Users }           = require('./utils/users');
const app                 = express();
const PORT                = process.env.PORT || 3000;
const server              = http.createServer(app);
const io                  = socketIO(server);
const users               = new Users();
const publicPath          = path.join(__dirname, '../public');

app.use(express.static(publicPath));

const timestamp = Date.now();

io.on('connection', (socket) => {
  console.log('>>> Server: New User Connected');


  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    // socket.leave(params.room);

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('>>> Server: createMessage = ', message);

    io.emit('newMessage', generateMessage(socket.id, message.text));
    callback();

    socket.on('createLocationMessage', (coords) => {
      // console.log('>>> Server: this is coords: ', coords);
      io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.long))
    });

  });

  socket.on('disconnect', () => {
    // console.log('>>> Server: User was disconnected');
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  })
});

server.listen(PORT, () => {
  console.log(`>>> Server is up port: ${PORT} env: ${app.get('env')}`);
});
