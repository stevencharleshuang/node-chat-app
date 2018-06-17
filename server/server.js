const express   = require('express');
const socketIO  = require('socket.io');
const path      = require('path');

const app       = express();
const PORT      = process.env.PORT || 3000;


const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Server is up port: ${PORT} env: ${app.get('env')}`);
});
